[中文](./README.md) | **English**

# Qing-UU // HUD Homepage Archive

**Branch: `codex/homepage-before-20261031` · Status: archived; no further feature development.**

This branch preserves the Next.js homepage used before the 2026-10-31 replacement, based on commit `35d7e61834bfcc8f61b6f8d0773bb561c8244871`. It uses RAINMORIME's sci-fi HUD design, with a loading sequence, multi-column navigation, project and experience pages, contact details, and a music player.

[HUD archive preview](https://codex-homepage-before-202610.profile-git-brh.pages.dev) · [Current production site](https://info.reliarc.com)

The production website is the Rhine Lab version maintained on [main](https://github.com/qinghuan-yu/profile/tree/main). This branch is retained for reference and recovery.

## Contents and stack

The archived project list contains GIF-PLAYER, VUE-PIANO, Pianalysis, Minimalist-Calendar, MCMer, and Dialograph.

Stack: Next.js 14, React 18, TypeScript, SCSS, GSAP, and Three.js. The local Node server provides SSE visitor statistics. The Cloudflare Pages build uses static export and does not run that Node server.

## Local use

Check out this branch, then run:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The `PORT` value in `.env.local` can override the default port.

For a local production build:

```sh
npm run build
npm start
```

These are the commands preserved with the archive. This documentation update does not upgrade dependencies or claim renewed compatibility testing.

## File guide

| Path | Contents |
| --- | --- |
| `data/projects.ts` | Project descriptions, links, and details |
| `data/experience.ts` | Education and experience |
| `data/skills.ts` | Skills |
| `pages/` | Page routes |
| `components/layout/` | Navigation, HUD, and layout |
| `components/interactive/` | Music player, lightbox, lever, and cursor |
| `styles/` | Styles and animation |
| `server.js` | Local Node server and SSE statistics |

## Cloudflare Pages

This branch is a historical preview branch in the `profile-git` Pages project. Its preserved build command is `npm run build:cloudflare`, with output in `out`. The production domain `info.reliarc.com` follows `main`.

## Related branches

- [main](https://github.com/qinghuan-yu/profile/tree/main): maintained Rhine Lab homepage and production branch.
- [codex/homepage-migration](https://github.com/qinghuan-yu/profile/tree/codex/homepage-migration): archived Vite interactive portfolio.
- [codex/rhine-homepage](https://github.com/qinghuan-yu/profile/tree/codex/rhine-homepage): Rhine version before migration to main.

## Credits and license

Original template design and development by [RainMorime](https://github.com/RainMorime), from [rainmorime-template](https://github.com/RainMorime/rainmorime-template). Personal content was adapted by Qing-UU.

The upstream [MIT license](./LICENSE) is retained in this branch. Keep the original attribution; third-party assets remain subject to their respective rights.
