# Plan - Portfolio v1

How the site in `01-spec.md` gets built, tested and shipped by 31 October 2026. The spec says **what**; this plan says **how** and **when**.


## 1. Tech stack

| Part | Choice | Why | Spec link |
| --- | --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript, latest stable version at setup | Same stack as Habilux and Taysil, so it's fast to build and easy to explain in an interview. Builds static pages, which helps Lighthouse. | NFR-01, NFR-07 |
| Styling | Tailwind CSS v4 | Already used on Habilux and Taysil. Breakpoints make 375px/1440px simple. | NFR-02, US-08 |
| Content | Typed TypeScript files in `content/` | No CMS (constitution §6). TypeScript fails the build if a project is missing a section. | NFR-03, US-05 |
| Hosting | Vercel, free `.vercel.app` URL | HTTPS by default, and a preview URL for every push. | NFR-09 |
| Analytics | Vercel Analytics (`@vercel/analytics`) | Cookieless, so no banner. | NFR-10 |
| Fonts | `next/font` | Self-hosted, no layout shift. | NFR-01 |
| Images | `next/image`, SVG logos | Correct sizes on each screen. | NFR-01 |
| Tests | Playwright | Automates the clickable criteria at 375px and 1440px in 3 browser engines. Also records the feature videos. | §3 of the spec |
| Accessibility check | axe DevTools (browser extension) | Finds contrast and label problems. | NFR-04 |


## 2. Structure

### 2.1 Routes

| Spec page | File | Notes |
| --- | --- | --- |
| Home `/` | `app/page.tsx` | Hero + projects section |
| Project `/projects/<name>` | `app/projects/[slug]/page.tsx` | `generateStaticParams` builds the 3 pages. `dynamicParams = false`, so any other name (e.g. `/projects/abc`) shows the 404 page (US-09). |
| Not found | `app/not-found.tsx` | Message + `Back to Home` button |
| Every page | `app/layout.tsx` | Header and footer live here, so they appear on every page, the 404 included (US-01, US-02, US-03, US-09). |

### 2.2 Folders

```
app/
  layout.tsx              header + footer + <Analytics />
  page.tsx                home
  not-found.tsx           404
  opengraph-image.tsx     home link preview (NFR-07)
  projects/[slug]/
    page.tsx              project page
    opengraph-image.tsx   one preview image per project
components/               no visible text inside (NFR-03)
content/
  site.ts                 name, role, stack, hero text, header/footer labels, contact URLs, 404 text
  projects/
    cuddly.ts
    habilux.ts
    taysil.ts
    index.ts              the 3 projects in display order: Cuddly, Habilux, Taysil
  types.ts                the SiteContent and Project types
public/
  luis-marques-cv.pdf     US-01
  logos/                  one SVG per project
  screenshots/<slug>/     fake data only (US-10)
  videos/<slug>.mp4       ≤ 3 MB each (NFR-06)
  videos/<slug>.jpg       poster images
tests/                    Playwright tests, one file per story
```

A Portuguese version (constitution §3, later) only needs a `content/pt/` copy. No component has to change.

### 2.3 Content model

`content/types.ts` holds the `Project` type. Its fields follow the 8 sections of a project page in the spec's §2, in the same order, so the page can't skip a section:

1. `slug`, `name`, `oneLiner`, `logo`
2. `overview`
3. `role` (for Cuddly, it includes the team of 4)
4. `stack`
5. `keyFeatures`
6. `uniqueFeature`: `title`, `howIBuiltIt`, `video`, `poster`
7. `screenshots`: `src` and `alt` for each one
8. `links`: `preview` and `code`

### 2.4 Components

| Component | Used in | Stories |
| --- | --- | --- |
| `Header` | layout | US-01 (`View CV` always visible, no menu at 375px) |
| `Footer` | layout | US-02, US-03 (GitHub, LinkedIn, email as visible text) |
| `Hero` | home | US-01 (`View CV` button) |
| `ProjectsSection` + `ProjectCard` | home | US-04 |
| `ProjectPage` sections | project page | US-05, US-06, US-07 |
| `FeatureVideo` | project page | US-06, NFR-06 |
| `FictionalDataCaption` | under previews and videos | US-10 |
| `ExternalLink` | everywhere | One component for every "opens in a new tab" link (`target="_blank" rel="noopener noreferrer"`), so CV, GitHub, LinkedIn, `Live preview` and `Code` behave the same. |

### 2.5 How the tricky parts work

- **Projects row (US-04).** Uses plain CSS, with no carousel library. At 375px the cards sit in a horizontal row with `scroll-snap`, each one narrower than the screen so the next card peeks in. At 1440px the same cards become a 3-column grid. The dots follow the visible card using `IntersectionObserver`. Nothing moves on its own, and each card is one link, so Tab and Enter work automatically.
- **CV (US-01).** The PDF lives in `public/` under its final name, `luis-marques-cv.pdf`, and is opened with `ExternalLink`. The browser downloads it under that name.
- **Email (US-02).** A `mailto:` link whose visible text is the address itself, so it still works with no mail app.
- **Videos (US-06, NFR-06).** `<video controls muted playsInline preload="none" poster=…>`: nothing downloads until play, there's no sound and no autoplay. Files are compressed with `ffmpeg` (H.264 MP4) until they're 3 MB or less.
- **Link previews (NFR-07).** `opengraph-image.tsx` files generate the images when the site is built. There are no hand-made image files.
- **Titles (NFR-07).** `generateMetadata` on each page: `Luís Marques — Web & Mobile Developer` on Home, and `<Project> — Luís Marques` on each project page.


## 3. Testing

### 3.1 Automated (Playwright)

- Two screen sizes (375×812 and 1440×900) × three engines (Chromium, WebKit for Safari, Firefox). This covers US-08 and most of NFR-05.
- One test file per story: `tests/us-01-cv.spec.ts` … `tests/us-10-client-data.spec.ts`.
- Tests run against `npm run build && npm start`, the same build that gets deployed.

| Story | What the test checks |
| --- | --- |
| US-01 | `View CV` in the header on every page; it opens a new tab; the file name; it's visible at 375px without scrolling |
| US-02 | The footer email is a `mailto:` link and its text is the address |
| US-03 | The GitHub and LinkedIn links have the correct URLs and open in a new tab |
| US-04 | Card order; logo, name and one-liner; 3 side by side at 1440px; the peek and the dots at 375px; Tab + Enter |
| US-05 | The section order; `Code` and `Live preview` open in a new tab; the name in the header goes home |
| US-06 | The video has `preload="none"`, `muted`, no `autoplay`, and fits the screen width at 375px |
| US-08 | No sideways scroll on any page at either width; tap areas of at least 44×44px |
| US-09 | `/projects/abc` shows the message and `Back to Home`; the header and footer are present |
| US-10 | Every preview and video has the caption "All data shown is fictional."; no link points to the clients' production sites |

### 3.2 Manual checklist (before launch)

- [ ] NFR-01: Lighthouse mobile on all 5 pages, all 4 scores ≥ 90
- [ ] NFR-04: axe DevTools shows 0 serious or critical issues on all 5 pages, plus a keyboard-only pass
- [ ] NFR-05: a real iPhone (Safari) and a real Android phone (Chrome), plus Edge on desktop
- [ ] NFR-06: each video is ≤ 3 MB and lasts 15–30 seconds (US-06)
- [ ] NFR-07: LinkedIn Post Inspector shows a preview image for Home and each project
- [ ] NFR-10: no cookies in DevTools → Application
- [ ] US-02: clicking the email link opens the mail app with the address filled in
- [ ] US-07: the Taysil video shows a Sanity edit appearing on the site
- [ ] US-10: every screenshot, video and live preview checked by eye for real data; Habilux and Taysil repos searched (including git history)


## 4. Work outside the code

These block content, so they start in week 1, alongside the coding.

| Task | Needed by |
| --- | --- |
| Clean the Habilux preview (`habilux.vercel.app`) so it shows only fake data | 23 Oct |
| Clean the Taysil preview (`taysil-demo.vercel.app`) so it shows only fake data | 23 Oct |
| Search the Habilux and Taysil repos for real customer data, including git history. Deleting a file doesn't remove it from history; if real data is in the history, the repo gets rewritten or made private. | 23 Oct |
| Final CV as `luis-marques-cv.pdf` | 14 Oct |
| Project logos as SVG | 18 Oct |
| Screenshots of each project with fake data | 23 Oct |
| Cuddly video: the app's web version in two phone-sized windows side by side, on the Firebase emulator with fake data, recorded with Playwright. Logging an entry on one phone makes it appear on the other. | 25 Oct |
| Habilux and Taysil videos: Playwright recordings of the cleaned previews | 25 Oct |
| Content text for each project (overview, role, features, how I built it) | 21 Oct |


## 5. Schedule

| Milestone | Date | Done when |
| --- | --- | --- |
| M0 - Plan and tasks | Sun 11 Oct | This plan and `03-tasks.md` are done and committed |
| M1 - Skeleton live | Wed 14 Oct | Next.js + Tailwind + Playwright set up; header, footer, 404 and an empty home page are deployed to the Vercel URL; US-01, US-02, US-03 and US-09 tests pass |
| M2 - Home page | Sun 18 Oct | Hero and projects section are done; US-04 passes |
| M3 - Project pages | Fri 23 Oct | The 3 project pages are done with real text (videos can still be placeholders); US-05 and US-07 pass |
| M4 - Assets | Mon 26 Oct | Cleaned previews, final videos, screenshots and link preview images are in; US-06 and US-10 pass |
| M5 - Quality pass | Wed 28 Oct | US-08 and every item in the manual checklist pass; every Definition of Done item except "shown to my teacher" is done |
| Blender slot | 29–30 Oct | **Only if M5 is met** (constitution §6). Otherwise this time is buffer for whatever slipped. |
| Launch | Sat 31 Oct | Shown to the IEFP orientation teacher; the Definition of Done is complete |

The site is deployed from M1 onward, so every push gets a live URL. "Deploy" never becomes a last-day risk.


## 6. Risks

| Risk | What happens |
| --- | --- |
| Cleaning the previews takes too long | The spec already covers it: the `Live preview` link only goes on the site once the preview is clean. The page ships with the video and the code link. |
| Part of Cuddly doesn't work in its web version (for example native sign-in) | Record the same two-phone scene on the Android emulator instead (`adb screenrecord`), with the Firebase emulator and fake data. |
| A video goes over 3 MB, or Lighthouse drops because of it | Shorten or re-compress it; the poster image and the `preload="none"` setting keep it off the first load. |
| Real data found in a repo's git history | Make that repo private and take its `Code` link off until it's fixed. |
| Falling behind | The Blender slot is the buffer. Cut order if needed: Blender → link preview images → analytics. Never cut anything in the Definition of Done. |


## 7. Next

`specs/03-tasks.md`: the work split into small tasks (one sitting each). Each task names the story or NFR it completes and the test that proves it.
