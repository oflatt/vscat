# vscat

[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/v/oflatt.vscat.svg)](https://marketplace.visualstudio.com/items?itemName=oflatt.vscat)
[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/oflatt.vscat.svg)](https://marketplace.visualstudio.com/items?itemName=oflatt.vscat)
[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/r/oflatt.vscat.svg)](https://marketplace.visualstudio.com/items?itemName=oflatt.vscat)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/jengjeng/aural-coding-vscode/blob/master/LICENSE)

This Visual Studio Code extension increases your productivity by 200% by playing meow sounds when you type.

## Requirements

### Linux

On Linux, you will need to have mplayer installed and on your PATH to get this extension working.

**Debian based**

```bash
sudo apt-get install mplayer
```

**Red Hat based**

```bash
sudo dnf install mplayer
```

**Arch based**

```bash
sudo pacman -S mplayer
```

### Windows and Mac

No special requirements.

## Installation

Run `code --install-extension oflatt.vscat`

or search [vsCat](https://marketplace.visualstudio.com/items?itemName=oflatt.vscat) in Extensions Marketplace.

## How to use

### Enable / Disable

vsCat will start immediately when Visual Studio Code is started. However, you can enable and disable the extension by executing these commands in the Command Palette (Cmd+Shift+P):

- `vsCat: Enable`
- `vsCat: Disable`

### Volume control

You can adjust the volume of the sounds by executing these commands in the Command Palette (Cmd+Shift+P):

- `vsCat: Volume Up`
- `vsCat: Volume Down`
- `vsCat: Set Volume`

**NOTE:** The volume adjustments only apply to this extension's sounds. It does not affect the system volume.

## Known Issues & Bugs

The extension is in a very early stage. Please report any issues / bugs you find.

## Contributing

Any pull request is welcome.

## Release Notes

### 1.4.4

Thanks mattogodoy for the original extension. oflatt has turned your project into vscat.

### 1.4.3

- Fixed bug in which manually setting the volume went always to minimum or maximum.
- Redacted some of the messages.

### 1.4.2

- Minor fixes

### 1.4.1

- Fixed dependency error

### 1.4.0

- Now you can type the volume level directly using the `vsCat: Set Volume` command.
  - Thanks, [Onur Yüksel](https://github.com/Onuryukselce)!

### 1.3.0

- Now you can adjust volume levels for Mac, Windows and Linux. This feature has not been tested in Linux yet.
- Merged Pull Request [#5](https://github.com/mattogodoy/hacker-sounds/pull/5)
  - Thanks, [Jory Liang](https://github.com/liangzr)!
- Replaced [sWavPlayer](https://www.dcmembers.com/skwire/download/swavplayer/) for [sounder](https://www.elifulkerson.com/projects/commandline-wav-player.php) as the Windows sound player with the following benefits:
  - Much smaller in size (sounder is 33 KB and sWavPlayer was 878 KB)
  - Performance in Windows is greatly improved
  - Allows to set the volume
- Updated dependencies

### 1.2.0

- Sounds improved in volume level and quality.
  - Thanks, [exoticus](https://github.com/exoticus)!
- Merged Pull Request [#3](https://github.com/mattogodoy/hacker-sounds/pull/3)
  - Thanks, [tiansin](https://github.com/tiansin)!

### 1.1.1

- Merged Pull Request [#2](https://github.com/mattogodoy/hacker-sounds/pull/2)
  - Thanks, [tiansin](https://github.com/tiansin)!

### 1.1.0

- Refactored part of the code
- New and better sounds

### 1.0.3

Fixed issue [#1](https://github.com/mattogodoy/hacker-sounds/issues/1)

### 1.0.2

Added fix for Windows. It's working now 🎉

### 1.0.1

Updated README information.

### 1.0.0

Initial release. Working on macOS.

## Credits

For Windows, this extension uses the `sounder` light-weight player:
<https://www.elifulkerson.com/projects/commandline-wav-player.php>

-----------------------------------------------------------------------------------------------------------

**Hack the world!**
