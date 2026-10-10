# Tasks - Portfolio v1

The plan in `02-plan.md`, split into small tasks. Each task fits in one sitting and ends in one commit.

**Rules**
- Do the tasks in order inside a milestone. A task can start once the tasks it builds on are done.
- A task is done when its "Done when" check passes. For code tasks, that means its Playwright test passes on `npm run build && npm start`.
- One commit per task, with the task ID in the message, for example `feat(T06): header with View CV link`.
- Tick the box when the task is done.


## M1 - Skeleton live (by Wed 14 Oct)

- [x] **T01 - Create the app.** Next.js (App Router) + TypeScript + Tailwind CSS v4 + ESLint, in the repo root.
  Done when: `npm run dev` shows a page and `npm run build` passes. Refs: plan §1.
- [x] **T02 - Deploy to Vercel.** Connect the GitHub repo to Vercel.
  Done when: a push to `main` updates the public `.vercel.app` URL, served over HTTPS. Refs: NFR-09.
- [x] **T03 - Set up Playwright.** Two screen sizes (375×812, 1440×900) × three engines (Chromium, WebKit, Firefox), running against the production build. Add one smoke test: the home page loads.
  Done when: `npx playwright test` passes in all 6 combinations. Refs: plan §3.1.
- [ ] **T04 - Content types and site content.** `content/types.ts` (SiteContent, Project) and `content/site.ts` (name, role, stack, hero text, header and footer labels, contact URLs, 404 text).
  Done when: removing any field from `site.ts` makes `npm run build` fail. Refs: NFR-03, plan §2.3.
- [ ] **T05 - `ExternalLink` component.** Every link that opens in a new tab uses it.
  Done when: a test checks that it renders `target="_blank"` and `rel="noopener noreferrer"`. Refs: plan §2.4.
- [ ] **T06 - CV file.** The final CV saved as `public/luis-marques-cv.pdf`.
  Done when: `/luis-marques-cv.pdf` opens on the deployed site. Refs: US-01.
- [ ] **T07 - Layout and header.** `app/layout.tsx` with `lang="en"`; the header has the name (link to Home) and `View CV`.
  Done when: `tests/us-01-cv.spec.ts` passes for criteria 1, 3, 4 and 5. Refs: US-01.
- [ ] **T08 - Footer.** GitHub, LinkedIn, and the email address as a visible `mailto:` link.
  Done when: `tests/us-02-email.spec.ts` and `tests/us-03-github-linkedin.spec.ts` pass. Refs: US-02, US-03.
- [ ] **T09 - 404 page.** `app/not-found.tsx` with the message and a `Back to Home` button.
  Done when: `tests/us-09-not-found.spec.ts` passes (the project-URL check comes in T19). Refs: US-09.
- [ ] **T10 - Home and 404 titles.** `metadata` with a title and description on the home page and the 404 page.
  Done when: each page shows its own title in the browser tab. Refs: NFR-07.

**M1 check:** the header, footer and 404 page are live on the Vercel URL, and the US-01, US-02, US-03 and US-09 tests pass.


## M2 - Home page (by Sun 18 Oct)

- [ ] **T11 - Hero.** Name, role, stack, a `View CV` button and a link to the projects section, all text from `site.ts`.
  Done when: US-01 criterion 2 passes. Refs: US-01, NFR-03.
- [ ] **T12 - Project logos.** One SVG per project in `public/logos/`.
  Done when: all 3 files open in the browser. Refs: US-04.
- [ ] **T13 - Project content files (card fields).** `content/projects/cuddly.ts`, `habilux.ts`, `taysil.ts` with `slug`, `name`, `oneLiner` and `logo`, plus `index.ts` in the order Cuddly, Habilux, Taysil. The other fields hold placeholder text for now.
  Done when: `npm run build` passes. Refs: spec §2, plan §2.3.
- [ ] **T14 - `ProjectCard`.** Logo (alt text = project name), name and one-liner; the whole card is one link with a visible focus outline.
  Done when: the card criteria of `tests/us-04-projects.spec.ts` pass (content, click, Tab + Enter). Refs: US-04.
- [ ] **T15 - Projects section at 1440px.** A 3-column grid.
  Done when: the US-04 order and side-by-side criteria pass at 1440px. Refs: US-04.
- [ ] **T16 - Projects row at 375px.** A horizontal row with `scroll-snap`, where the next card peeks in at the edge.
  Done when: the US-04 peek and swipe criteria pass at 375px. Refs: US-04, plan §2.5.
- [ ] **T17 - Dots.** Dots under the row that follow the visible card (`IntersectionObserver`). Nothing moves on its own.
  Done when: all of `tests/us-04-projects.spec.ts` passes. Refs: US-04.

**M2 check:** the home page is complete and US-04 passes in all 6 combinations.


## M3 - Project pages (by Fri 23 Oct)

- [ ] **T18 - Data cleanup started.** Begin cleaning the Habilux and Taysil previews and auditing both repos (including git history), so they're finished by 23 Oct.
  Done when: there's a list of every place that holds real data in each preview and repo. Refs: US-10, plan §4.
- [ ] **T19 - Project route.** `app/projects/[slug]/page.tsx` with `generateStaticParams` and `dynamicParams = false`.
  Done when: `/projects/cuddly` loads, and `/projects/abc` shows the 404 page (the last US-09 check). Refs: US-05, US-09.
- [ ] **T20 - Page sections.** The 8 sections in the spec's order, reading from the project file.
  Done when: the US-05 section-order criterion passes on all 3 pages. Refs: US-05.
- [ ] **T21 - Links section.** `Live preview` and `Code` through `ExternalLink`. `Live preview` is optional in the type and stays hidden until the preview is clean.
  Done when: the US-05 link criteria pass. Refs: US-05, spec §2 (client data).
- [ ] **T22 - `FeatureVideo`.** `<video controls muted playsInline preload="none" poster>`, with a placeholder video for now.
  Done when: `tests/us-06-feature.spec.ts` passes for the attribute and 375px-width criteria. Refs: US-06, NFR-06.
- [ ] **T23 - `FictionalDataCaption`.** "All data shown is fictional." under every preview section and video.
  Done when: the caption criterion of `tests/us-10-client-data.spec.ts` passes. Refs: US-10.
- [ ] **T24 - Cuddly text.** Overview, role (team of 4: 2 developers, 2 designers; team lead and tech lead), stack, key features, and how the unique feature was built.
  Done when: the US-05 Cuddly role criterion passes. Refs: US-05, constitution §4.
- [ ] **T25 - Habilux text.** The same sections; the overview says it was built for a real estate agency.
  Done when: the US-07 overview criterion passes for Habilux. Refs: US-05, US-07.
- [ ] **T26 - Taysil text.** The same sections; the overview says it was built for an industrial products company.
  Done when: the US-07 overview criterion passes for Taysil. Refs: US-05, US-07.
- [ ] **T27 - Project page titles.** `generateMetadata`: `<Project> — Luís Marques`, plus a description.
  Done when: each project page shows its own title. Refs: NFR-07.
- [ ] **T28 - Data cleanup finished.** The Habilux and Taysil previews show only fake data, and both repos are clean (or made private).
  Done when: a check by eye finds no real names, phones, emails or addresses in either preview or repo. Refs: US-10.

**M3 check:** the 3 project pages are live with their real text, and US-05 and US-07 pass. Videos can still be placeholders.


## M4 - Assets (by Mon 26 Oct)

- [ ] **T29 - Screenshots.** The main screens of each project, with fake data, in `public/screenshots/<slug>/`, each with alt text.
  Done when: every screenshot is checked for real data. Refs: US-05, US-10.
- [ ] **T30 - Habilux and Taysil videos.** Playwright recordings of the cleaned previews, 15–30 seconds each, compressed with `ffmpeg` to 3 MB or less, plus poster images. The Taysil video shows a Sanity edit appearing on the site.
  Done when: both files meet NFR-06 and US-06. Refs: US-06, US-07, NFR-06.
- [ ] **T31 - Cuddly video.** The web version in two phone-sized windows side by side, on the Firebase emulator with fake data: an entry logged on one phone appears on the other. If the web version breaks, use the Android emulator instead.
  Done when: the file meets NFR-06 and US-06. Refs: US-06, NFR-06.
- [ ] **T32 - Live preview links on.** Add the `preview` URLs for Habilux and Taysil (Cuddly's showcase page can be added from T21 onward).
  Done when: every US-05 and US-10 criterion passes. Refs: US-05, US-10.
- [ ] **T33 - Link preview images.** `opengraph-image.tsx` for Home and for each project.
  Done when: LinkedIn Post Inspector shows the right image for all 4 URLs. Refs: NFR-07.
- [ ] **T34 - Analytics.** Add `<Analytics />` from `@vercel/analytics`.
  Done when: visits show up in the Vercel dashboard, and DevTools → Application shows no cookies. Refs: NFR-10.

**M4 check:** no placeholders are left anywhere, and US-06 and US-10 pass.


## M5 - Quality pass (by Wed 28 Oct)

- [ ] **T35 - Responsive.** `tests/us-08-responsive.spec.ts`: no sideways scroll on any page at either width, and tap areas of at least 44×44px. Fix whatever fails.
  Done when: the full Playwright suite passes in all 6 combinations. Refs: US-08, NFR-02.
- [ ] **T36 - Lighthouse.** Mobile, incognito, all 5 pages, on the deployed site. Fix until every score is 90 or higher.
  Done when: all 20 scores are ≥ 90. Refs: NFR-01.
- [ ] **T37 - Accessibility.** axe DevTools on all 5 pages, plus a keyboard-only pass.
  Done when: there are 0 serious or critical issues, and every link and button can be reached by keyboard. Refs: NFR-04.
- [ ] **T38 - Real devices.** A real iPhone (Safari), a real Android phone (Chrome) and Edge on desktop: click through US-01 to US-10.
  Done when: nothing breaks. Refs: NFR-05.
- [ ] **T39 - Rest of the manual checklist.** The items in plan §3.2 that aren't covered above (mail app, cookies, video sizes, the Taysil video).
  Done when: every box in plan §3.2 is ticked. Refs: plan §3.2.
- [ ] **T40 - README.** Link the spec, plan and tasks; fill in the tech stack and the live URL.
  Done when: the README has no "in progress" or "to be defined" text left. Refs: constitution §7.

**M5 check:** every Definition of Done item is complete except "shown to my teacher".


## Blender slot (29–30 Oct, only if M5 is met)

- [ ] **T41 - Gate check.** Is every M5 box ticked? If not, use these two days to finish what's left, and skip T42.
- [ ] **T42 - Blender 3D element.** One element in the hero only, loaded after the rest of the page, with a static image fallback.
  Done when: NFR-08 passes. If any Lighthouse score drops below 90, a rendered image replaces it. Refs: constitution §6, NFR-08.


## Launch (Sat 31 Oct)

- [ ] **T43 - Final check on production.** Run the full Playwright suite against the live URL, and tick the Definition of Done in the constitution.
  Done when: every test passes and every Definition of Done box except the last is ticked. Refs: constitution §7.
- [ ] **T44 - Show to the IEFP orientation teacher.**
  Done when: it has been shown. Refs: constitution §7.
