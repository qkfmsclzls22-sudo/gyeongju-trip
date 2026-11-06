---
name: Gyeongju Trip
description: An open watercolor landscape with precise Korean editorial typography and a usable travel desk.
colors:
  studio-paper: "#fcfcf9"
  studio-ink: "#183e38"
  studio-orange: "#275c50"
  studio-muted: "#596762"
  studio-line: "#183e3826"
  studio-soft: "#edf2ee"
  studio-dark: "#173f38"
  studio-on-dark: "#dce7df"
  studio-horizon: "#142e58"
  panorama-sky: "#d4e5e9"
typography:
  display:
    fontFamily: "var(--font-pretendard), sans-serif"
    fontSize: "clamp(64px,8.4vw,128px)"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-.04em"
  headline:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "clamp(32px,3.7vw,56px)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.035em"
  scene-title:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "clamp(29px,3vw,44px)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-.035em"
  scene-choice:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "clamp(20px,2vw,29px)"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "-.015em"
  body:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "15px"
    fontWeight: 450
    lineHeight: 1.9
    letterSpacing: "-.015em"
  lead:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "-.025em"
  label:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "-.015em"
  action:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "-.015em"
  estimate:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "34px"
    fontWeight: 550
    lineHeight: 1.35
    letterSpacing: "-.03em"
  masthead:
    fontFamily: "var(--font-pretendard), sans-serif"
    fontSize: "23px"
    fontWeight: 750
    lineHeight: 1.7
    letterSpacing: "-.04em"
rounded:
  square: "0"
  dot: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-mobile: "56px"
  section-wide: "88px"
  section-open: "104px"
components:
  primary-action:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.studio-paper}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "14px 20px"
  primary-action-hover:
    backgroundColor: "{colors.studio-orange}"
  line-action:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    padding: "10px 0"
  companion-choice:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
  companion-choice-selected:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.studio-paper}"
  date-field:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.square}"
    padding: "10px 12px"
    width: "100%"
  header-enquiry:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.square}"
    padding: "11px 20px"
  header-enquiry-hover:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.studio-paper}"
  chapter-nav:
    textColor: "{colors.studio-ink}"
    typography: "{typography.label}"
  scene-choice:
    backgroundColor: "transparent"
    textColor: "{colors.studio-muted}"
    typography: "{typography.scene-choice}"
    padding: "22px 24px 20px 0"
  scene-choice-selected:
    textColor: "{colors.studio-ink}"
  notebook-sheet:
    backgroundColor: "{colors.studio-soft}"
    textColor: "{colors.studio-ink}"
    padding: "30px"
  edition-switch:
    backgroundColor: "transparent"
    textColor: "{colors.studio-muted}"
    padding: "8px 0"
  edition-switch-selected:
    textColor: "{colors.studio-ink}"
---

# Design System: Gyeongju Trip

## Overview

**Creative North Star: "Open landscape"**

A contemporary Korean travel publication: near-white ground, spruce ink, expansive hand-painted landscapes, crisp Korean grotesk typography, quiet rules and sparse navigation. Spacious composition gives the destination room to lead, while real photographs, clear operation facts and restrained planning controls make choosing a visit straightforward.

The owner selected STAYFOLIO's editorial direction, retained Gyeongju Trip's watercolor identity and delegated the whole-homepage redesign. This document records the implemented system. The homepage story remains in [.impeccable/home-direction.md](.impeccable/home-direction.md); durable product and release commitments remain in [PRODUCT.md](PRODUCT.md). This is a code-led implementation, without an approved image comp or a pixel-fidelity claim.

**Key Characteristics:**

- Full-width painted landscape with unboxed typography and generous margins.
- Precise Pretendard scale contrast, spruce controls and quiet ruled rows.
- Real tour photographs lead selection; original watercolors retain the destination's identity.
- Visible planning tools, explicit estimates and a browser-local travel notebook.
- Manual campaign and gallery defaults, useful server-rendered content and reduced-motion support.
- Homepage-scoped visual changes with existing tour, enquiry and account destinations preserved.

Sources: [app/page.tsx](app/page.tsx), [app/explorer.module.css](app/explorer.module.css), [app/home-sections.module.css](app/home-sections.module.css), [app/campaign.module.css](app/campaign.module.css), [app/journey.module.css](app/journey.module.css), [JourneyExplorer](app/components/JourneyExplorer.tsx), [CampaignCover](app/components/CampaignCover.tsx), [HomeGallery](app/components/HomeGallery.tsx) and inherited shared rules in [app/homepage.module.css](app/homepage.module.css). Frontmatter holds implemented primitives; [.impeccable/design.json](.impeccable/design.json) holds extensions and current component snippets. Its synthesized tonal ramps are preview aids, not implementation tokens. Unused legacy finder, poster-card and mobile-rail selectors, and the unused studio-photo value, are not normative.

## Colors

Near-white and soft sage surfaces support spruce typography; the paintings and real photographs supply the larger blue, ochre, celadon and indigo fields.

### Primary

- **Spruce ink — studio-ink:** primary text, selected scene underline, course markers, companion selection and booking/copy actions.
- **Deep leaf — studio-orange:** action hover, carets and focus outlines. The historical CSS name remains; its current value is green.
- **Forest field — studio-dark:** full-width group-planning section and text-selection background.
- **Pale foliage — studio-on-dark:** supporting group copy, service labels and enquiry rule.

### Secondary

- **Night horizon — studio-horizon:** background beneath the original closing panorama.
- **Pale blue air — panorama-sky:** campaign image frame background.

### Neutral

- **Near-white paper — studio-paper:** homepage canvas and header; contrasting text on dark controls.
- **Muted sage — studio-muted:** supporting copy, operation labels, captions and inactive edition controls.
- **Spruce hairline — studio-line:** dividers, course line, field borders and unselected controls.
- **Soft sage — studio-soft:** scene hover/mobile selection, comparison, notebook sheet, gallery and footer.

**The Landscape Color Rule.** Let the painted scene carry the largest color changes; keep surrounding homepage controls within the shared spruce and near-white roles.

Shared navigation text, gallery controls and footer details retain some inherited neutrals. They are existing implementation details, not a second palette for new homepage components. Operational-route colors remain outside this scope.

## Typography

**Display, headings and body:** self-hosted Pretendard Variable. app/page.tsx loads weights 100–900 through next/font/local and applies the variable to the homepage wrapper, covering its header, main and footer. Most roles retain SUITE as fallback; campaign title and masthead fall directly back to sans-serif.

Pretendard is by Kil Hyung-jin and licensed under the SIL Open Font License 1.1; preserve [app/fonts/OFL-Pretendard.txt](app/fonts/OFL-Pretendard.txt), the unchanged bundled font and attribution in [app/fonts/README.md](app/fonts/README.md). The bundled SHA-256 is 9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4. SUITE remains the root family for other routes. Barlow Condensed remains the explicit accent for inherited gallery caption numbers and the gallery count.

### Hierarchy

- **Display:** the frontmatter role is the desktop campaign title. At 761–1100px it uses clamp(64px,8.5vw,94px); at 760px and below, clamp(48px,12.5vw,90px) with line-height 1.18. The 128px ceiling follows the owner's bold, spacious brief.
- **Headline:** the shared large section role applies to gallery, group and guide headings. Explorer and notebook use the same size with line-height 1.27. Mobile explorer/notebook headings are 34px/1.3; gallery/group/guide headings are 32px. The closing statement uses clamp(30px,3.7vw,56px)/1.4, becoming 29px on mobile.
- **Scene title and choice:** scene titles describe the selected experience and become 32px on mobile. The three choice names become 17px on mobile and 16px at 360px and below; their metadata is 12–13px. These are button labels, not decorative eyebrows.
- **Body and lead:** selected-tour prose uses the body role with a maximum measure of 60ch. Other section prose uses 14–16px with line-height 1.8–1.9. The campaign invitation becomes 16px on tablet and 15px on mobile, limited there to 23ch.
- **Label and action:** chapter labels use the label role, becoming 12px on mobile. Main booking and copy actions use the action role. Companion labels are 13px desktop and 12px mobile. Supporting captions and hints use 10–13px.
- **Estimate:** the party total uses the frontmatter estimate role with tabular numerals. Comparison and notebook amounts also use tabular numerals.
- **Masthead:** the frontmatter role reduces to 17px on mobile. Notebook sheet titles use 22px, reducing to 20px; landmark names use 22px, reducing to 19px.

**The Scope Rule.** Apply Pretendard through the homepage variable and selectors; do not globally replace the existing typography of operational routes.

## Layout

The main content measure is min(90%,1680px). Campaign art, the group section and the closing illustration span the viewport. The shared gallery controls and footer contact container retain min(90%,1440px). Header and footer sit outside the single main landmark; the skip link targets that main element.

The cover introduction aligns a large title left and a compact 260px invitation right, with a 48px gap and 68px top / 48px bottom padding. The full-width panorama is 3:1, with an 80px-minimum caption/control row. The title remains separate from the painting. On tablet the invitation narrows to 220px; on mobile it moves beneath the title, and the introduction uses 44px top / 30px bottom padding. Mobile art is cropped into a 2:1 window at 59% center for day and 55% center for night.

The tour explorer opens with three equal-width scene buttons, all visible at once. The selected scene pairs a large 1.24-ratio photograph and course schematic with an information column at a 1.4:1 ratio and 5% gap. At 761–1100px the columns become equal, the gap becomes 4%, the photograph becomes 0.8-ratio and steppers stack. At 760px and below, scene choices become three full-width rows, then the photograph, course and information stack; the photograph is 1.25-ratio. Tour selection does not use a horizontal rail.

The explorer uses 104px top / 88px bottom spacing, becoming 64px / 56px on mobile. The always-visible notebook is a 1:1.15 split with 10% gap and 72px / 96px padding; it becomes one column with 30px gap and 56px vertical padding. Its soft-sage sheet uses 30px padding, 22px on mobile and 18px at 360px and below.

The comparison uses three ruled rows. Desktop rows place tour, operating hours and estimated amount in three columns; mobile rows put the linked tour name above hours and amount. There is no minimum-width table or horizontal overflow requirement.

The photo gallery has 88px vertical spacing, becoming 56px on mobile. The group section pairs a large photograph and forest-colored text field at 1.1:1, with a 540px minimum photo height; mobile stacks a 1.3-ratio photo above the copy. The preparation guide is a 1:1.25 split with 10% gap and 104px vertical spacing, becoming a single column with 64px spacing. Landmarks form four columns with 32px gaps, becoming a 2-by-2 grid with 32px row / 20px column gaps on mobile.

The chapter navigation is a normal-flow ruled row; the header remains sticky at 84px desktop and 62px mobile. Anchored homepage content uses a 92px desktop scroll margin and the retained 126px mobile scroll margin. Gallery scrolling remains a separate intentional carousel pattern; it is not the layout model for tour choices or landmarks. These rules were extracted from source, not a browser verification performed during documentation.

## Elevation & Depth

Campaign, explorer, notebook, FAQ and group surfaces are flat. White space, hairlines and surface tone provide separation; the imagery supplies pictorial depth. The inherited open mobile menu uses the structural shadow 0 20px 25px #00000012. The homepage header disables inherited backdrop blur.

**The Flat Surface Rule.** Use spacing, rules and surface tone for homepage groups; reserve the inherited menu shadow for the open navigation layer.

Campaign titles arrive once with a masked upward translation over 900ms, using cubic-bezier(.16,1,.3,1), with the second segment delayed 110ms. Selecting an edition remounts the title and crossfades artwork over 650ms ease-out. The cover link arrow shifts 5px over 200ms ease-out on hover. Motion-off removes title animation and cover transitions; system reduced-motion also removes the arrow shift and shows a device-setting note. There is no campaign timer or scroll-linked title loop. FAQ plus/minus state changes have no custom animation.

The gallery starts paused. A user can opt into the 4000ms slide timer and animated WebP items; playback runs only while the gallery is at least 25% visible, the document is visible and pointer interaction is not active. Keyboard-visible focus pauses playback. Reduced-motion has a still default; explicit play remains available.

## Shapes

Square photograph frames, straight rules and rectangular planning controls establish the main form language. Homepage scene photographs use cover cropping; the temple image is positioned at 50% 63%. Original square landmark watercolors use contain and remain complete. Existing product posters remain intact on their product detail routes. Do not apply the poster no-crop rule to editorial photographs or panoramic derivatives.

Course nodes and edition indicators are circular. Header enquiry and gallery controls also use square corners under the final shared stylesheet overrides. Keep rounded badges already present in shared navigation separate from this flat action and field pattern.

## Components

### Campaign and artwork

The signature cover pairs large Korean type with an open painted horizon and manual day/night selection. Pressed states identify the edition; inactive artwork is hidden from assistive technology, and copy/caption changes use polite live regions. Daylight is server-rendered. The night image enters the DOM only after its first selection and remains available thereafter.

The cover uses campaign-autumn-wide.webp and campaign-woljeonggyo-wide.webp. They are generated panoramic derivatives of the owner's original autumn and Woljeonggyo watercolors, produced with built-in image_gen and compressed to WebP with Sharp quality 88. Original source artwork remains unchanged. [campaign-art-provenance.json](public/images/campaign-art-provenance.json) is the exact prompt/source/output record; it is not an archive of the image tool's generated original files. Do not alter those recorded prompts or describe these paintings as documentary photographs. No new raster was created in this implementation iteration.

Four original square landmark paintings link to their existing pages. Blossom art appears in the empty notebook; the original panoramic night illustration closes the main content. Existing real photographs lead the explorer, gallery and group section.

### Scene selection, course and facts

Three semantic pressed buttons show the tour name, setting and adult unit price. Selection is indicated by text color, a bottom rule and a desktop arrow; mobile adds a soft-sage fill. Hover uses soft sage. The scene combines a real photo, caption, ordered course schematic, editorial title and description, then a ruled definition list for operation, meeting point and departure conditions.

Commercial facts come from TOURS in lib/tours.ts; route and companion guidance come from lib/tour-editorial.ts. The course is schematic and notes that actual routing can vary. It is not a geographic map or a timed itinerary.

### Buttons, choices and party estimate

Booking and copy buttons share the spruce rectangular action, 52px minimum height and deep-leaf hover. The copy action fills its sheet width. The adjacent save toggle is an outlined 52px-high control with a check icon, changed label, soft-sage selected background and aria-pressed. After saving, a status link leads to the visible notebook.

Adult and child steppers adjust a total of 1–20 people; their outputs and estimated amount use tabular numerals. Stepper controls are 40px by 44px on desktop and 44px square on mobile. Totals use calcAmount, the same shared pricing function used by the existing product system. The estimate explicitly states that the party must be selected again in booking.

Companion choices are 44px-minimum rectangular outlined controls. Selection fills spruce with near-white text and updates product-specific family, couple/friend or solo guidance; group selection provides the custom-enquiry route. Selecting an active choice clears it. The comparison toggle is an underlined action with an expanded state and plus/minus icon.

### Notebook and fields

The notebook is visible without opening a disclosure. The optional native date field has square corners, a 48px minimum height and the note-only hint. The soft-sage sheet shows an illustrated empty state or linked saved rows with course, operating hours, meeting point, estimate and a remove control.

The v2 browser-local record persists saved tour IDs, date, explicit companion choice and adult/child counts. Legacy v1 saved-ID arrays migrate without inventing a companion. Invalid data is normalized and storage failure is disclosed. The copy action exports these facts and detail-page links; if clipboard access fails, a selectable textarea appears. The notebook is a shortlist, never a reservation, availability result or confirmed itinerary.

### Gallery, group planning and preparation

The gallery retains manual scrolling, previous/next controls, count, keyboard left/right movement and an opt-in autoplay control. Animated WebP items use still posters when playback is stopped, offscreen or unavailable. The large group section pairs an actual tour photograph with school, company/MICE and private-tour planning links.

Preparation questions use native details/summary rows with a plus becoming a minus when open. They cover participation, children, notebook meaning, meeting/preparation and product-level terms; account and personal SMS enquiry links remain nearby. Answers rely on existing product facts.

### Navigation, focus and feedback

The homepage header uses the journey navigation variant: tour selection, preparation, local news, company story and account, plus existing travel-information and group-enquiry controls. The chapter row links to tours, notebook with saved count, and preparation. Other routes retain the default header navigation. Escape closes the open mobile menu and returns focus to its trigger.

Interactive elements receive a 2px deep-leaf outline offset by 5px; group enquiry focus uses near-white. Preserve semantic controls, pressed/expanded states, accessible image alternatives, live estimates and status feedback. Controls that write browser state wait until hydration; the initial tour and notebook content remain deterministic.

## Do's and Don'ts

### Do:

- **Do** use the near-white, spruce and soft-sage roles for new homepage UI.
- **Do** distinguish panoramic paintings, cover-cropped editorial photographs and intact landmark originals.
- **Do** preserve original source artwork, the exact derivative prompt record and bundled font license.
- **Do** keep all three tour choices visible and use two landmark columns on mobile.
- **Do** preserve shared pricing, explicit estimate wording, the visible notebook and existing booking destinations.
- **Do** keep manual defaults, visible keyboard focus and the campaign's motion-off and reduced-motion paths.
- **Do** deliver this redesign as a preview for owner review; obtain owner authorization before merging or promoting production.

### Don't:

- **Don't** restore the superseded dark two-panel cover, paper mount or SUITE homepage display requirement.
- **Don't** substitute advertisement posters for the implemented homepage scene photographs.
- **Don't** crop product poster lettering or landmark originals, cover them with controls or add a zoom that crops them.
- **Don't** represent saved notes, chosen dates or party estimates as reservations or live inventory.
- **Don't** invent reviews, ratings, prices, operating details or business claims.
- **Don't** claim that this homepage redesign globally replaces typography or shared styles on other routes.
- **Don't** add automatic cycling or continuous title motion to the manual campaign cover.
