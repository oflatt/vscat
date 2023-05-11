// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import player, { PlayerConfig } from './player';
import debounce = require('lodash.debounce');
import { toInteger } from 'lodash';

let listener: EditorListener;
let isActive: boolean;
let isNotArrowKey: boolean;
let config: PlayerConfig = {
    macVol: 1,
    winVol: 100,
    linuxVol: 100
};

export function activate(context: vscode.ExtensionContext) {
    console.log('Initializing "hacker-sounds" extension');

    // is the extension activated? yes by default.
    isActive = context.globalState.get('hacker_sounds', true);
    config.macVol = context.globalState.get('mac_volume', 1);
    config.winVol = context.globalState.get('win_volume', 100);
    config.linuxVol = context.globalState.get('linux_volume', 1);

    // to avoid multiple different instances
    listener = listener || new EditorListener(player);

    vscode.commands.registerCommand('hacker_sounds.enable', () => {
        if (!isActive) {
            context.globalState.update('hacker_sounds', true);
            isActive = true;
            vscode.window.showInformationMessage('Hacker Sounds extension enabled');
        } else {
            vscode.window.showWarningMessage('Hacker Sounds extension is already enabled');
        }
    });
    vscode.commands.registerCommand('hacker_sounds.disable', () => {
        if (isActive) {
            context.globalState.update('hacker_sounds', false);
            isActive = false;
            vscode.window.showInformationMessage('Hacker Sounds extension disabled');
        } else {
            vscode.window.showWarningMessage('Hacker Sounds extension is already disabled');
        }
    });
    vscode.commands.registerCommand('hacker_sounds.volumeUp', () => {
        let newVol = null;
        switch (process.platform) {
            case 'darwin':
                config.macVol += 1;

                if (config.macVol > 10) {
                    vscode.window.showWarningMessage('Hacker Sounds already at maximum volume');
                    config.macVol = 10;
                }

                newVol = config.macVol;
                context.globalState.update('mac_volume', newVol);
                break;

            case 'win32':
                config.winVol += 10;

                if (config.winVol > 100) {
                    vscode.window.showWarningMessage('Hacker Sounds already at maximum volume');
                    config.winVol = 100;
                }

                newVol = config.winVol;
                context.globalState.update('win_volume', newVol);
                break;

            case 'linux':
                config.linuxVol += 1;

                if (config.linuxVol > 10) {
                    vscode.window.showWarningMessage('Hacker Sounds already at maximum volume');
                    config.linuxVol = 10;
                }

                newVol = config.linuxVol;
                context.globalState.update('linux_volume', newVol);
                break;

            default:
                newVol = 0;
                break;
        }

        vscode.window.showInformationMessage('Hacker Sounds volume raised: ' + newVol);
    });
    vscode.commands.registerCommand('hacker_sounds.volumeDown', () => {
        let newVol = null;

        switch (process.platform) {
            case 'darwin':
                config.macVol -= 1;

                if (config.macVol < 1) {
                    vscode.window.showWarningMessage('Hacker Sounds already at minimum volume');
                    config.macVol = 1;
                }

                newVol = config.macVol;
                context.globalState.update('mac_volume', newVol);
                break;

            case 'win32':
                config.winVol -= 10;

                if (config.winVol < 10) {
                    vscode.window.showWarningMessage('Hacker Sounds already at minimum volume');
                    config.winVol = 10;
                }

                newVol = config.winVol;
                context.globalState.update('win_volume', newVol);
                break;

            case 'linux':
                config.linuxVol -= 1;

                if (config.linuxVol < 1) {
                    vscode.window.showWarningMessage('Hacker Sounds already at minimum volume');
                    config.linuxVol = 1;
                }

                newVol = config.linuxVol;
                context.globalState.update('linux_volume', newVol);
                break;

            default:
                newVol = 0;
                break;
        }

        vscode.window.showInformationMessage('Hacker Sounds volume lowered: ' + newVol);
    });

    vscode.commands.registerCommand('hacker_sounds.setVolume', async () => {
        let input = await vscode.window.showInputBox()
        let newVol = toInteger(input);

        switch (process.platform) {
            case 'darwin':
                if (newVol > 10) {
                    vscode.window.showInformationMessage("Volume increased to maximum")
                    config.macVol = 10;
                } else if (newVol < 1) {
                    vscode.window.showInformationMessage("Volume decreased to minimum")
                    config.macVol = 1
                } else {
                    if (config.macVol < newVol)
                        vscode.window.showInformationMessage("Volume increased to " + newVol)
                    else if (config.macVol > newVol)
                        vscode.window.showInformationMessage("Volume decreased to " + newVol)
                    else
                        vscode.window.showWarningMessage("Volume already at " + newVol);

                    config.macVol = newVol;
                }

                context.globalState.update('mac_volume', newVol);
                break;

            case 'win32':
                if (newVol > 100) {
                    vscode.window.showInformationMessage("Volume increased to maximum")
                    config.winVol = 100;
                }
                else if (newVol < 10) {
                    vscode.window.showInformationMessage("Volume decreased to minimum")
                    config.winVol = 10
                } else {
                    if (config.winVol < newVol)
                        vscode.window.showInformationMessage("Volume increased to " + newVol)
                    else if (config.winVol > newVol)
                        vscode.window.showInformationMessage("Volume decreased to " + newVol)
                    else
                        vscode.window.showWarningMessage("Volume already at " + newVol);

                    config.winVol = newVol;
                }

                context.globalState.update('win_volume', newVol);
                break;

            case 'linux':
                if (newVol > 10) {
                    vscode.window.showInformationMessage("Volume increased to maximum")
                    config.linuxVol = 10;
                } else if (newVol < 1) {
                    vscode.window.showInformationMessage("Volume decreased to minimum")
                    config.linuxVol = 1
                } else {
                    if (config.linuxVol < newVol)
                        vscode.window.showInformationMessage("Volume increased to " + newVol)
                    else if (config.linuxVol > newVol)
                        vscode.window.showInformationMessage("Volume decreased to " + newVol)
                    else
                        vscode.window.showWarningMessage("Volume already at " + newVol);

                    config.linuxVol = newVol;
                }

                context.globalState.update('linux_volume', newVol);
                break;

            default:
                newVol = 0;
                break;
        }
    });


    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(listener);
}

// this method is called when your extension is deactivated
export function deactivate() { }

/**
 * Listen to editor changes and play a sound when a key is pressed.
 */
export class EditorListener {
    private _disposable: vscode.Disposable;
    private _subscriptions: vscode.Disposable[] = [];
    private _basePath: string = path.join(__dirname, '..');

    // Audio files
    private _spaceAudio: string = path.join(this._basePath, 'audio', 'spacebar.wav');
    private _deleteAudio: string = path.join(this._basePath, 'audio', 'delete.wav');
    private _otherKeysAudio: string = path.join(this._basePath, 'audio', 'key.wav');
    private _cutAudio: string = path.join(this._basePath, 'audio', 'cut.wav');
    private _pasteAudio: string = path.join(this._basePath, 'audio', 'paste.wav');
    private _enterAudio: string = path.join(this._basePath, 'audio', 'enter.wav');
    private _tabAudio: string = path.join(this._basePath, 'audio', 'tab.wav');
    private _arrowsAudio: string = path.join(this._basePath, 'audio', 'arrow.wav');

    constructor(private player: any) {
        isNotArrowKey = false;

        vscode.workspace.onDidChangeTextDocument(this._keystrokeCallback, this, this._subscriptions);
        vscode.window.onDidChangeTextEditorSelection(this._arrowKeysCallback, this, this._subscriptions);
        this._disposable = vscode.Disposable.from(...this._subscriptions);
        this.player = {
            play: (filePath: string) => player.play(filePath, config)
        };
    }

    _keystrokeCallback = debounce((event: vscode.TextDocumentChangeEvent) => {
        if (!isActive) { return; }

        let activeDocument = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;
        if (event.document !== activeDocument || event.contentChanges.length === 0) { return; }

        isNotArrowKey = true;
        let pressedKey = event.contentChanges[0].text;

        switch (pressedKey) {
            case '':
                if (event.contentChanges[0].rangeLength === 1) {
                    // backspace or delete pressed
                    this.player.play(this._deleteAudio);
                } else {
                    // text cut
                    this.player.play(this._cutAudio);
                }
                break;

            case ' ':
                // space bar pressed
                this.player.play(this._spaceAudio);
                break;

            case '\n':
                // enter pressed
                this.player.play(this._enterAudio);
                break;

            case '\t':
            case '  ':
            case '    ':
                // tab pressed
                this.player.play(this._tabAudio);
                break;

            default:
                let textLength = pressedKey.trim().length;

                switch (textLength) {
                    case 0:
                        // user hit Enter while indented
                        this.player.play(this._enterAudio);
                        break;

                    case 1:
                        const keyCode = pressedKey.toUpperCase().charCodeAt(0);
                        var index = ((keyCode - 'A'.charCodeAt(0)) % 12)-5;
                        if (/[A-Z]/.test(pressedKey)) {
                            index += 12;
                        }
                        var file = path.join(this._basePath, 'audio', 'cat', 'cat_' + index.toString() + '.wav')
                        // it's a regular character
                        this.player.play(file);
                        break;

                    default:
                        // text pasted
                        this.player.play(this._pasteAudio);
                        break;
                }
                break;
        }
    }, 100, { leading: true });

    _arrowKeysCallback = debounce((event: vscode.TextEditorSelectionChangeEvent) => {
        if (!isActive) { return; }

        // current editor
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document !== event.textEditor.document) { return; }

        // check if there is no selection
        if (editor.selection.isEmpty && isNotArrowKey === false) {
            this.player.play(this._arrowsAudio);
        } else {
            isNotArrowKey = false;
        }
    }, 100, { leading: true });

    dispose() {
        this._disposable.dispose();
    }
}
