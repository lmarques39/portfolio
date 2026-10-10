# Spec - Portfolio v1


## 1. Pages
| Page | URL | Purpose |
| --- | --- | --- |
| Home | / | Shows my name, role, stack, CV in the hero section, a projects section with cards to select |
| Project | /projects/<project-name> | Lets the visitor see the name and details of the project as well as my role on the project, the stack, and links to the live site or repo |
| Not found | (any unknown URL) | Explains the page doesn't exist and offers a button back to Home |  



## 2. Decisions 

- Projects get their own page: each one has too much content for a card, and it keeps the home page uncluttered. The list of projects lives in a section on the home page (cards -> click -> project page)

- A visitor must land on the home page. The home page contains:
  - Hero section: my name, role and stack, plus links to my projects and my CV.
  - Project section: Cards with the logo of each project 

- Contact section: GitHub, LinkedIn and Send me Email links. Serves as footer section on every page. This satisfies the "contact one click from any page" rule.

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


