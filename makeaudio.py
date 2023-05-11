import librosa
import os
import soundfile as sf


path = "./audio/cat"

if os.path.isdir(path):
    os.rmdir(path)

os.mkdir(path)

y, sr = librosa.load('catcut.wav', sr=16000)


for i in range(-50, 51):
    y_shifted = librosa.effects.pitch_shift(y, sr=sr, n_steps=i)
    sf.write('{}/cat_{}.wav'.format(path, i), y_shifted, sr)
