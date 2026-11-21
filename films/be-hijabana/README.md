# Be Hijabana — illustrated music status

Original 9:16 illustrated motion edit using the audio from the user's reel:
https://www.instagram.com/reel/DffMEaRP0VA/

The source caption identifies the song as "Be Hijabana Woh Saamne Aa Gaye"
and credits Nusrat Fateh Ali Khan. The original downloaded silent reference
video is not used in this edit. All five illustrated frames were newly made
with the built-in image_gen tool. Prompts are in IMAGE-PROMPTS.md.

## Visual interpretation

- 0-9 seconds: a reveal followed by the listener's romantic response.
- 9-18 seconds: the encounter and the feeling of mutual attraction.
- 18-27 seconds: eye contact, alternating close-ups and reactions.
- 27-32.36 seconds: shared smiles as the moment resolves.

The exact cut list is in edit-plan.json. Song phrase boundaries were estimated
with two local speech-recognition passes. Sung Urdu words are imperfectly
recognized, so the film does not display unchecked automatic lyric captions.

This is animated illustration: authored camera moves, framing changes,
floating petals, drifting light, a foreground veil and dissolves. It does not
claim full-body character performance or lip-sync.

## Rebuild from the studio root

```sh
node films/be-hijabana/build.mjs
node scripts/hf.mjs lint films/be-hijabana
node scripts/hf.mjs render films/be-hijabana --output films/be-hijabana/output/be-hijabana-status.mp4 --fps 30 --quality high --workers 1
```

Source audio is retained at its original timing. No replacement music or
narration was added. The artwork is original; the source song is not ours.

## Delivered files and verification

- `output/be-hijabana-mobile.mp4`: 1080x1920, 30 fps, 32.37 seconds, about 19 MB;
  H.264/AAC with fast-start metadata for convenient playback.
- `output/be-hijabana-status.mp4`: higher-bitrate master, about 86 MB.
- `output/storyboard.jpg`: nine sampled frames from the rendered film.
- `output/validation.json`: render validation summary.

Nine sampled frames were visually reviewed. A full-file decode found no
unexpected black intervals; measured audio peak was -2.3 dBFS. Source and
render audio correlation was 0.99975 at the same timeline position. HyperFrames
lint reported no errors and one timeline-density recommendation.

Sharing copy was encoded from the master with:

```sh
ffmpeg -i output/be-hijabana-status.mp4 -c:v libx264 -preset medium -crf 21 -maxrate 8M -bufsize 16M -pix_fmt yuv420p -c:a copy -movflags +faststart output/be-hijabana-mobile.mp4
```
