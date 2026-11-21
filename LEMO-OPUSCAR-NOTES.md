# Lemo-Opuscar review

Reviewed 16 November 2026: https://github.com/lemomo-ai/lemo-opuscar

## Where it fits

The repository is a collection of 99 film styles, style guides, demo source code,
and a film-making toolchain. It is built around Claude; its README also describes
copying the skill for other agents, but says reproduction quality can vary.

HyperFrames is the renderer used by this starter. Opuscar can supply visual
direction or a separate canvas/WebGL production workflow. Its styles are not
drop-in HyperFrames templates: a selected style needs to be adapted and tested.

## Suggested shortlist for shayari (our assessment)

| Style | Possible use | Official preview |
| --- | --- | --- |
| Double Exposure | Reflective or sad shayari with layered silhouettes | https://lemomo-ai.github.io/lemo-opuscar/styles/double-exposure/ |
| Neon Tubes | Night-time, bold, city or attitude quotes | https://lemomo-ai.github.io/lemo-opuscar/styles/neon-tubes/ |
| Watercolor Brush | Gentle, romantic or hopeful verses | https://lemomo-ai.github.io/lemo-opuscar/styles/watercolor/ |

The current moon/night starter is original; it does not implement one of these
styles. For the first real status, choose a style and adapt it to 1080 x 1920,
short reading-friendly lines and the chosen music.

## Setup decision

Reviewed only; the Opuscar plugin and its dependencies have not been installed.
Keep the working HyperFrames starter for now. Add an Opuscar style when a
specific look is selected, instead of running a second full film stack for
simple text + music statuses.

## License reference

The repository LICENSE assigns MIT to its own code, CC BY-NC 4.0 to its docs,
and CC BY 4.0 to demo films/stills, with separate third-party terms. It explicitly
grants additional permission to follow/adapt the docs to make one's own films,
including commercial/client films. Do not assume every bundled asset has the
same license; consult the selected demo's CREDITS.

Source: https://github.com/lemomo-ai/lemo-opuscar/blob/main/LICENSE
