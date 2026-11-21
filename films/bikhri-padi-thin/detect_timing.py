import os
import subprocess
from PIL import Image
import numpy as np

video = r"C:\Users\gs\.gemini\antigravity\brain\a060bb9a-d316-4969-acce-6600d702ade3\.user_uploaded\media_1794980177429_3bcb9101.mp4"
temp_dir = r"films\bikhri-padi-thin\temp_frames"
os.makedirs(temp_dir, exist_ok=True)

cmd = [
    "ffmpeg", "-y", "-i", video,
    "-vf", "fps=5,crop=620:130:50:150",
    os.path.join(temp_dir, "b_%04d.png")
]
subprocess.run(cmd, check=True)

frames = sorted([f for f in os.listdir(temp_dir) if f.startswith("b_")])
print(f"Total banner frames: {len(frames)}")

prev = None
changes = []
for i, fn in enumerate(frames):
    path = os.path.join(temp_dir, fn)
    im = np.array(Image.open(path).convert("L"), dtype=float)
    if prev is not None:
        diff = np.mean(np.abs(im - prev))
        if diff > 12.0:
            t = i * 0.2
            changes.append((i, t, diff, fn))
    prev = im

for idx, t, diff, fn in changes:
    print(f"Frame {idx:3d} ({t:5.2f}s): diff = {diff:5.2f} [{fn}]")
