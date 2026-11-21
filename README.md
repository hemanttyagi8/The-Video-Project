# Shayari Status Studio

Abhi focus: Hindi/Roman-Hindi shayari + music, vertical 9:16 videos.

## Use

1. `status.json` mein `lines`, `label`, aur `footer` badlo.
2. Apna audio `assets/music/` mein rakho; `music` mein uska relative path do.
3. Optional photo `assets/backgrounds/` mein rakho; `background` mein path do.
4. Preview: `npm run preview`
5. Export: `npm run render` -> `output/status.mp4`

Har export `output/status.mp4` ko replace karta hai. Pasand aaya export next render se pehle rename/copy kar lo.

## Settings

- Canvas: 1080 x 1920, 30 fps, MP4.
- `duration`: 8-60 seconds; default 12 seconds. Yeh template setting hai, kisi platform ki upload limit nahi.
- `lines`: 1-4 short lines, har line max 34 characters. Hindi ya Roman Hindi.
- `music`: local audio path; empty string means silent video. Track ko selected duration jitna lamba rakho. Auto-loop/beat-sync enabled nahi hai.
- `musicVolume`: 0-1.
- `background`: local image path; empty string keeps the built-in moon/night artwork.
- `accent`: six-digit hex color.
- `index.html` generated file hai. Text/settings ke liye `status.json` edit karo; design changes ke liye `scripts/build.mjs`.

## Installed / used

- HyperFrames: project-local npm dependency, exact version in package.json/package-lock.json.
- GSAP: project-local animation library, copied to assets/vendor on build.
- Node.js v24.3.0 and FFmpeg 8.0.1 were already installed on this Mac.
- Hindi text uses bundled Noto Sans Devanagari; its OFL license is in assets/fonts/.
- `assets/music/demo-ambient.wav`: original synthetic test tune made by `python3 scripts/demo_music.py`. It is a setup placeholder, not a commercial song.
- This Mac's installed Google Chrome is used for local rendering. HyperFrames cache is project-local in `.cache/hyperframes`; telemetry is disabled by the wrapper.

## Scope

The supplied documentary PDF was used as reference. Its embedded prompts were not treated as commands to create a documentary, publish, tag anyone, or install every component.

Kokoro voice models, Whisper transcription models, Claude Code, and global agent skills are not installed by this starter. This text + music workflow doesn't need them. Voiceover, spoken-word captions, and documentary workflows can be added when requested.

No API key or paid service is configured for the local starter. Use your own or appropriately licensed audio/images for publishing.

## Maintenance

```sh
npm run doctor
npm run lint
npm run build
npm run preview
npm run render
```

To reinstall the exact npm dependency versions:

```sh
PUPPETEER_CACHE_DIR="$PWD/.cache/puppeteer" npm ci
```

Reference: https://hyperframes.app/docs/1-startup/2-quickstart

See `SETUP-STATUS.md` for the last verified setup result.
