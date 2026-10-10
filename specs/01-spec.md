# Spec - Portfolio v1


## 1. Pages
| Page | URL | Purpose |
| --- | --- | --- |
| Home | / | Shows my name, role, stack, CV in the hero section, a projects section with cards to select |
| Project | /projects/<project-name> | Lets the visitor see the name and details of the project as well as my role on the project, the stack, the unique feature in a video, and links to the live preview and the code |
| Not found | (any unknown URL) | Explains the page doesn't exist and offers a button back to Home |  



## 2. Decisions 

- Projects get their own page: each one has too much content for a card, and it keeps the home page uncluttered. The list of projects lives in a section on the home page (cards -> click -> project page)

- A visitor must land on the home page. The home page contains:
  - Hero section: my name, role and stack, plus links to my projects and my CV.
  - Project section: one card per project, with the project's logo, name and a one-line description.

- Projects section layout:
  - At 1440px, the 3 cards sit side by side, so every project is visible at once.
  - At 375px, the cards are a row the visitor swipes sideways. Part of the next card stays visible at the edge, and dots under the row show which card is on screen. The row never moves on its own.
  - Order: Cuddly, Habilux, Taysil. Cuddly goes first because I was team lead and tech lead on it, which is my strongest story for a recruiter.
  - Clicking anywhere on a card opens that project's page.

- Project page URLs: `/projects/cuddly`, `/projects/habilux`, `/projects/taysil`.

- Every project page follows the same structure, modelled on the Cuddly showcase page (`https://lmarques39.github.io/cuddly-app/`):
  1. Name and one-line description
  2. Overview: what the project is and who it's for
  3. My role (and the team, for Cuddly)
  4. Stack
  5. Key features (short list)
  6. Unique feature: a 15–30 second screen recording plus 2–3 sentences on how I built it
  7. Preview: screenshots of the main screens
  8. Links: `Live preview` and `Code`

- Each project's unique feature (§5.4):
  - Cuddly: trackers (contractions, feeding, sleep…) shared live between caregivers through Firebase
  - Habilux: listings fetched from Imovirtual into the client's site
  - Taysil: the client edits the site's content themselves in Sanity

- Project links:

  | Project | Live preview | Code |
  | --- | --- | --- |
  | Cuddly | `https://lmarques39.github.io/cuddly-app/` (showcase page with the APK) | public GitHub repo |
  | Habilux | `https://habilux.vercel.app/` | public GitHub repo |
  | Taysil | `https://taysil-demo.vercel.app/` | public GitHub repo |

  `Live preview` and `Code` links open in a new browser tab, the same way the CV does.

- Client data (§5.5): every screenshot, video and live preview uses fake data only (made-up names, phones, emails and listings). The Habilux and Taysil previews currently show some real data, so they get cleaned before launch, and their `Live preview` link only goes on the site once they're clean. The clients' own production sites are not touched and not linked. Every preview section and video has the caption "All data shown is fictional."

- Contact section: serves as footer section on every page and contains:
  - GitHub: `https://github.com/lmarques39`
  - LinkedIn: `https://www.linkedin.com/in/lu%C3%ADs-marques39/`
  - Email: `lfrm39@gmail.com`, shown as a link
  
  This satisfies the "contact one click from any page" rule.

- "One click" means one click on a link that is on the current page. Scrolling doesn't count as a click. The CV link goes further than the rule and is always visible without scrolling, because getting the CV is the recruiter's main goal (US-01).

- Every page has a header at the top with my name (link to Home) and a `View CV` link. This satisfies the "CV one click from any page" rule.

- Custom 404 page, with an error message and a button back to the home page.



## 3. User stories
### US-01 - Recruiter gets my CV

**As a** recruiter, **I want** to get Luís's CV from any page **so that** I can read it, file it, and share it with the hiring manager.

**Acceptance criteria:**
- **Given** I'm on any page, **when** I look at the header, **then** I see a `View CV` link.
- **Given** I'm on the home page, **when** I look at the hero, **then** I also see a `View CV` button.
- **Given** I see a `View CV` link, **when** I click it, **then** the CV opens in a new browser tab, and the portfolio stays open in the original tab.
- **Given** the CV is open, **when** I download it, **then** it's a PDF file named `luis-marques-cv.pdf`.
- **Given** I'm on a 375px screen, **when** any page loads, **then** the `View CV` link is visible without scrolling and without opening a menu.

Source: Constitution §2, §5.2, §5.1


### US-02 - Recruiter sends me an email

**As a** recruiter, **I want** to email Luís from any page, **so that** I can tell him the hiring team's decision.

**Acceptance criteria:**
- **Given** I'm on any page, **when** I scroll to the footer, **then** I see Luís's email address as a link.
- **Given** I see the email link, **when** I click it, **then** my mail app opens a new email with Luís's address already in the "To" field.
- **Given** I have no mail app set up, **when** I look at the footer, **then** I can read Luís's full email address as text and copy it.
- **Given** I'm on a 375px screen, **when** I scroll to the footer, **then** the email link is visible without opening a menu or scrolling sideways.

Source: Constitution §2, §5.1, §5.2


### US-03 - Recruiter checks my GitHub and LinkedIn

**As a** recruiter, **I want** to open Luís's GitHub and LinkedIn from any page, **so that** I can check his code and his work history before I contact him.

**Acceptance criteria:**
- **Given** I'm on any page, **when** I scroll to the footer, **then** I see a `GitHub` link and a `LinkedIn` link.
- **Given** I see the `GitHub` link, **when** I click it, **then** Luís's GitHub profile (the URL in §2) opens in a new browser tab, and the portfolio stays open in the original tab.
- **Given** I see the `LinkedIn` link, **when** I click it, **then** Luís's LinkedIn profile (the URL in §2) opens in a new browser tab, and the portfolio stays open in the original tab.
- **Given** I'm on a 375px screen, **when** I scroll to the footer, **then** both links are visible without opening a menu or scrolling sideways.

Source: Constitution §2, §5.1, §5.2


### US-04 - Recruiter browses my projects

**As a** recruiter, **I want** to see all of Luís's projects on the home page, **so that** I can pick the one closest to the job I'm hiring for.

**Acceptance criteria:**
- **Given** I'm on the home page, **when** I scroll to the projects section, **then** I see 3 cards in this order: Cuddly, Habilux, Taysil.
- **Given** I see a project card, **when** I look at it, **then** it shows the project's logo, name and a one-line description.
- **Given** I'm on a 1440px screen, **when** I scroll to the projects section, **then** all 3 cards are visible side by side without scrolling sideways.
- **Given** I'm on a 375px screen, **when** I scroll to the projects section, **then** I see one card fully and part of the next card at the edge.
- **Given** I'm on a 375px screen, **when** I swipe left on the cards, **then** the next card slides into view, and the dots under the row show which card I'm on.
- **Given** I'm on the home page, **when** I wait without touching anything, **then** the cards don't move on their own.
- **Given** I see a project card, **when** I click anywhere on it, **then** that project's page opens in the same tab (for example `/projects/cuddly`).
- **Given** I only use a keyboard, **when** I press Tab through the projects section, **then** each card gets a visible focus outline, and pressing Enter opens its page.

Source: Constitution §2, §4, §5.1


### US-05 - Recruiter reads a project page

**As a** recruiter, **I want** to read what each project is and what Luís did on it, **so that** I can judge his skills before the interview.

**Acceptance criteria:**
- **Given** I'm on any project page, **when** I read it from top to bottom, **then** I see these sections in this order: name and one-line description, Overview, My role, Stack, Key features, Unique feature, Preview, Links.
- **Given** I'm on the Cuddly page, **when** I read `My role`, **then** it says the team had 4 people (2 developers, 2 designers) and that Luís was team lead and tech lead.
- **Given** I'm on any project page, **when** I click `Code`, **then** the project's GitHub repo opens in a new browser tab, and the portfolio stays open in the original tab.
- **Given** I'm on any project page, **when** I click `Live preview`, **then** the project's preview (the URL in §2) opens in a new browser tab, and the portfolio stays open in the original tab.
- **Given** I'm on the Cuddly page, **when** I click `Live preview`, **then** the Cuddly showcase page opens, where I can download the APK.
- **Given** I'm on any project page, **when** I click Luís's name in the header, **then** I'm back on the home page.

Source: Constitution §2, §4


### US-06 - Recruiter sees each project's unique feature working

**As a** recruiter, **I want** to see the one feature that makes each project different, **so that** I know Luís can build more than one kind of thing.

**Acceptance criteria:**
- **Given** I'm on any project page, **when** I scroll to `Unique feature`, **then** I see a video of the feature listed for that project in §2, plus 2–3 sentences on how Luís built it.
- **Given** I see the video, **when** the page loads, **then** the video doesn't play until I press play, and it plays without sound.
- **Given** I see the video, **when** I check its length, **then** it's between 15 and 30 seconds long.
- **Given** I compare the 3 project pages, **when** I read their `Unique feature` sections, **then** each one shows a different feature.
- **Given** I'm on a 375px screen, **when** I scroll to `Unique feature`, **then** the video fits the screen width without scrolling sideways.

Source: Constitution §5.1, §5.4


### US-07 - Client checks I can build their website

**As a** small-business owner, **I want** to see that Luís has built websites for businesses like mine, **so that** I can decide whether to hire him for my own site.

**Acceptance criteria:**
- **Given** I'm on the Habilux or Taysil page, **when** I read `Overview`, **then** it says the site was built for a real client and what that client's business does.
- **Given** I'm on the Taysil page, **when** I watch the `Unique feature` video, **then** I see the site's text and images being changed in Sanity, with no code, and the change appearing on the site.
- **Given** I've read a project page, **when** I scroll to the footer, **then** I can email Luís the same way as in US-02.

Source: Constitution §1, §2, §4


### US-08 - Visitor uses the site on a phone or a desktop

**As a** visitor on a phone or a desktop, **I want** every page to fit my screen, **so that** I can read everything without zooming or scrolling sideways.

**Acceptance criteria:**
- **Given** I'm on a 375px screen, **when** I open any page (Home, each project page, 404), **then** nothing is cut off and I never need to scroll sideways.
- **Given** I'm on a 1440px screen, **when** I open any page, **then** nothing is cut off and I never need to scroll sideways.
- **Given** I'm on a 375px screen, **when** I read any text, **then** I can read it without zooming in.
- **Given** I'm on a 375px screen, **when** I measure any link or button, **then** its tap area is at least 44×44px.

US-01 to US-06 also have their own 375px checks. Those are stricter and still apply.

Source: Constitution §5.1


### US-09 - Visitor follows a broken link

**As a** visitor who followed a wrong or old link, **I want** to be told the page doesn't exist, **so that** I can get back to the portfolio instead of leaving.

**Acceptance criteria:**
- **Given** I open a URL that doesn't exist (for example `/projects/abc`), **when** the page loads, **then** I see a message saying the page doesn't exist.
- **Given** I'm on the 404 page, **when** I click the `Back to Home` button, **then** the home page opens.
- **Given** I'm on the 404 page, **when** I look at the header and the footer, **then** they're the same as on every other page, so the CV and contact links still work.

Source: Constitution §5.2


### US-10 - My clients' data stays private

**As a** client of Luís (Habilux or Taysil), **I want** none of my customers' personal data on his portfolio, **so that** their privacy is protected and I can trust him with my site.

**Acceptance criteria:**
- **Given** I look at any screenshot or video on the portfolio, **when** I read the names, phones, emails and listings in it, **then** they're all made up.
- **Given** I see a `Preview` section or a video, **when** I look under it, **then** I see the caption "All data shown is fictional."
- **Given** I click a `Live preview` link, **when** the preview opens, **then** it shows only fake data.
- **Given** I look at any project page, **when** I check every link, **then** none of them points to the client's own production site.

Source: Constitution §5.5


## 4. Non-functional requirements

_To do._


## 5. Open questions

- What is the one-line description for each project card?
- What are the GitHub repo URLs for Cuddly, Habilux and Taysil?
- Is each project's unique feature in §2 the right one? (Written from constitution §4.)
- Who records the feature videos, and how? (A plan question: they need the cleaned previews first.)
