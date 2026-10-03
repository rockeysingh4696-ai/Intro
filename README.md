# A Little Birthday World

An interactive birthday keepsake built with React, Vite, Tailwind CSS, Framer Motion, and Lucide.

## Run locally

```sh
npm install
npm run dev
```

## Personalize it

Edit names, letter pages, reasons, memory captions, comfort notes, and the surprise in `src/data/birthdayData.js`. Replace image URLs in that same file with local `/images/...` paths or your own image URLs.

To enable the voice player, add a recording under `public/audio/` and set `voiceNote.audio` to its public path, such as `/audio/voice-placeholder.mp3`. Until then, the player stays disabled and displays its asset hint. Audio never autoplays.

Run `npm run build` for a production build and `npm run lint` for lint checks.
