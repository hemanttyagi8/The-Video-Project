"""Create an original soft synth bed for the setup test; no downloaded song."""
import math
import struct
import wave
from pathlib import Path

root = Path(__file__).resolve().parent.parent
target = root / 'assets/music/demo-ambient.wav'
target.parent.mkdir(parents=True, exist_ok=True)
rate, duration = 44100, 60
chords = [(220, 261.63, 329.63), (174.61, 220, 261.63),
          (130.81, 164.81, 196), (196, 246.94, 293.66)]
with wave.open(str(target), 'wb') as out:
    out.setparams((2, 2, rate, 0, 'NONE', 'not compressed'))
    block = bytearray()
    for n in range(rate * duration):
        t = n / rate
        segment, phase = int(t / 3), (t % 3) / 3
        envelope = math.sin(math.pi * phase) ** 0.5
        freqs = chords[segment % len(chords)]
        fade = min(1, t / 1.5, (duration - t) / 2)
        a = sum(math.sin(2 * math.pi * f * t) for f in freqs) / 3
        b = sum(math.sin(2 * math.pi * (f + 0.3) * t) for f in freqs) / 3
        block += struct.pack('<hh', int(a * envelope * fade * 5500), int(b * envelope * fade * 5500))
        if len(block) >= 65536:
            out.writeframesraw(block)
            block.clear()
    out.writeframesraw(block)
print(target)
