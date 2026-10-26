---
name: Gyeongju Trip
description: An open watercolor landscape with precise Korean editorial typography.
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
    fontSize: "clamp(30px,3.5vw,52px)"
    fontWeight: 550
    lineHeight: 1.35
    letterSpacing: "-.035em"
  title:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "clamp(21px,2vw,28px)"
    fontWeight: 650
    lineHeight: 1.45
    letterSpacing: "-.025em"
  body:
    fontFamily: "var(--font-pretendard), var(--font-suite), sans-serif"
    fontSize: "15px"
    fontWeight: 450
    lineHeight: 1.7
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
  masthead:
    fontFamily: "var(--font-pretendard), sans-serif"
    fontSize: "23px"
    fontWeight: 750
    lineHeight: 1.7
    letterSpacing: "-.04em"
rounded:
  square: "0"
  current-rail-marker: "3px"
  dot: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  collection-gap: "40px"
  section-gap: "48px"
components:
  line-action:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    typography: "{typography.label}"
    padding: "10px 0"
  line-action-hover:
    textColor: "{colors.studio-orange}"
  notebook-copy:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.studio-paper}"
    padding: "14px 18px"
    width: "100%"
  choice:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
  choice-selected:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.studio-paper}"
  date-field:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.square}"
    padding: "10px"
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
    backgroundColor: "{colors.studio-paper}"
    textColor: "{colors.studio-ink}"
    typography: "{typography.label}"
  tour-card:
    textColor: "{colors.studio-ink}"
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

A contemporary Korean travel publication: near-white ground, spruce ink, expansive hand-painted landscapes, crisp Korean grotesk typography, quiet rules and sparse navigation. Spacious composition gives the destination room to lead, while clear tour names, readable prices and restrained controls make choosing a visit straightforward.

The owner selected STAYFOLIO's editorial direction, retained Gyeongju Trip's watercolor identity and delegated the latest bold redesign of UI, image color and typography. This document records the implemented homepage system. The homepage composition and story remain in [.impeccable/home-direction.md](.impeccable/home-direction.md); durable product and release commitments remain in [PRODUCT.md](PRODUCT.md). This is a code-led implementation, without an approved image comp or a pixel-fidelity claim.

**Key Characteristics:**

- Full-width painted landscape with unboxed typography and generous margins.
- Precise Pretendard scale contrast, spruce controls and quiet ruled rows.
- Original product artwork and real tour photographs remain legible and recognizable.
- Manual campaign changes, useful server-rendered content and reduced-motion support.
- Homepage-scoped visual changes with existing tour and account destinations preserved.

Sources: [app/journey.module.css](app/journey.module.css), [app/campaign.module.css](app/campaign.module.css), [app/page.tsx](app/page.tsx), [CampaignCover](app/components/CampaignCover.tsx), and inherited shared styles in [app/homepage.module.css](app/homepage.module.css). Frontmatter contains implemented primitives; [.impeccable/design.json](.impeccable/design.json) carries extensions and representative component snippets. Its synthesized tonal ramps are preview aids, not additional implementation tokens. The declared but currently unused studio-photo value is intentionally not promoted into this system.

## Colors

Near-white and soft sage surfaces support spruce typography; the artwork provides the larger blue, ochre, celadon and indigo fields.

### Primary

- **Spruce ink — studio-ink:** primary text, rules on actions, selected preference choices and the notebook copy button.
- **Deep leaf — studio-orange:** interactive accents, saved counts, carets and focus outlines. The historical CSS name remains; the current value is green.
- **Forest field — studio-dark:** the compact group-planning block and selection background.
- **Pale foliage — studio-on-dark:** supporting copy and the enquiry rule within the forest field.

### Secondary

- **Night horizon — studio-horizon:** background beneath the original closing panoramic illustration.
- **Pale blue air — panorama-sky:** the campaign image frame's loading/background color.

### Neutral

- **Near-white paper — studio-paper:** homepage canvas and header; contrasting text on dark controls.
- **Muted sage — studio-muted:** secondary descriptions, caption and unselected edition controls.
- **Spruce hairline — studio-line:** translucent divider and field borders.
- **Soft sage — studio-soft:** recommendation, comparison, empty notebook, gallery and homepage contact surfaces.

**The Landscape Color Rule.** Let the painted scene carry the largest color changes; keep surrounding homepage controls within the shared spruce and near-white roles.

Shared navigation text and gallery control borders retain some inherited neutral colors from homepage.module.css. These are existing implementation details, not a second palette for new homepage components. Gallery caption metadata and hints, contact details and legal text use studio-muted on the homepage with a legacy fallback for other routes. Global route colors in globals.css are outside this homepage scope.

## Typography

**Display, headings and body:** self-hosted Pretendard Variable. app/page.tsx exposes the 100–900 font through next/font/local and applies its variable only to the homepage. Most homepage roles retain SUITE as a fallback; the campaign title and masthead fall directly back to sans-serif. The bundled font and SIL OFL attribution are recorded in [app/fonts/README.md](app/fonts/README.md).

Pretendard's clean Korean forms and restrained negative tracking replace the former rounded SUITE homepage display. Root-layout SUITE remains available for other routes. Barlow Condensed remains an existing accent for gallery caption numbers and the gallery count; the homepage masthead and contact heading now use Pretendard.

### Hierarchy

- **Display:** the frontmatter display role is the desktop campaign title. At 761–1100px it uses clamp(64px,8.5vw,94px); at 760px and below it uses clamp(48px,12.5vw,90px), line-height 1.18. The 128px desktop ceiling is deliberate for the owner's bold, spacious brief.
- **Headline:** collection and landmark headings use the frontmatter headline role. Mobile headings become 27px with line-height 1.5. The closing studio statement has its own larger desktop scale, clamp(30px,4vw,64px), weight 500 and line-height 1.45; mobile uses 26px.
- **Title:** tour titles use the frontmatter title role and become 24px on mobile. Disclosure headings are 23px/650, reducing to 19px; recommendation titles use 24px/650.
- **Body and lead:** the body role describes tour copy; notebook and recommendation prose can use line-height 1.8. Campaign lead copy reduces to 16px on tablet and 15px on mobile, where its measure is limited to 23ch.
- **Label:** action labels are generally 14px; supporting captions range from 11–13px. Edition controls use 14px, reducing to 13px on mobile, and weight 650 when selected. Numeric prices and counts use tabular numerals.
- **Masthead:** the frontmatter masthead role reduces to 17px on mobile.

**The Scope Rule.** Apply Pretendard through the homepage variable and selectors; do not globally replace the existing typography of operational routes.

## Layout

The primary content measure is min(90%,1680px), leaving 5% side margins until the maximum width applies. The campaign panorama and closing illustration are full width. The shared gallery heading/control container and contact container still use the existing min(90%,1440px) measure. Do not describe every page section as the same width.

The cover introduction aligns a large title left and a compact 260px story right, with a 48px gap and 68px top / 48px bottom padding. A full-width 3:1 panorama follows. The title is not placed on the image or inside a dark panel. Its caption row is at least 80px high, with day/night controls, a separate caption and motion control.

Desktop tour collections have three columns with a 40px gap; landmarks have four columns with a final 36px gap. Tour collection padding is 104px above and 96px below; landmarks have 112px vertical padding. Gallery padding is 96px; the studio statement uses 120px above and 100px below. Optional tools use ruled disclosures rather than adding another large image sequence.

At 761–1100px, the cover story narrows to 220px and the tour gap becomes 20px. At 760px and below, the introduction becomes a block with 44px top / 30px bottom padding; the invitation reflows beneath the title. The image window becomes 2:1, with object-position 59% center for day and 55% center for night. This is intentional panoramic cropping; it does not change the separate no-crop rule for product posters and square landmark artwork.

Mobile tour and landmark collections become manual horizontal scroll-snap rails. Each item occupies 87% of the track, with a 16px gap and a visible next-item preview. Dots, arrows, counts and left/right keyboard movement provide equivalent navigation. The chapter navigation becomes sticky below the 62px header; anchored sections use a 126px scroll margin. Forms and notebook content become one column. At 360px and below the rail controls wrap.

These are extracted layout rules, not a claim that a browser verification was performed during documentation.

## Elevation & Depth

Campaign, tour and tool surfaces are flat. White space, hairlines and the soft-sage fill separate content without adding card shadows. The panorama supplies pictorial depth; the page does not add an artificial paper mount or simulated lighting around it. The inherited open mobile menu is the one documented structural shadow (0 20px 25px #00000012). The homepage header explicitly disables inherited backdrop blur.

**The Flat Surface Rule.** Use spacing, rules and surface tone for homepage groups; reserve the inherited menu shadow for the open navigation layer.

The campaign title arrives once with a masked upward translation over 900ms, using cubic-bezier(.16,1,.3,1); its second segment is delayed 110ms. Changing the edition remounts the title. Images crossfade over 650ms ease-out; the tour-link arrow shifts 5px over 200ms ease-out on hover. The explicit motion switch removes the title animation and cover transitions. The system reduced-motion preference removes the title animation, image/arrow transitions and arrow shift, replacing the switch with a device-setting note. There is no campaign timer, looping typography or scroll-linked title animation. Disclosure plus icons rotate over 200ms ease-out.

## Shapes

Square image frames, straight rules and rectangular controls establish the form language. Tour product posters and landmark originals use square frames with object-fit:contain. They have no hover zoom or overlay that cuts off lettering or painted subjects. Campaign art uses object-fit:cover inside the panoramic window.

Circular shapes have a narrow functional role: the selected edition indicator and mobile rail dots. The active rail dot lengthens to a short marker with a 3px radius. Keep rounded badges already present in shared navigation separate from the flat homepage action and field pattern.

## Components

### Campaign and artwork

The signature cover pairs large Korean type with an open painted horizon and manual day/night selection. Pressed states identify the active edition; inactive images are hidden from assistive technology, while story and caption updates use polite live regions. Default daylight content is server-rendered and useful without JavaScript; changing editions requires JavaScript.

The cover uses campaign-autumn-wide.webp and campaign-woljeonggyo-wide.webp. They are generated panoramic derivatives of the owner's original autumn and Woljeonggyo watercolors, produced with built-in image_gen and compressed to WebP with Sharp quality 88. Original source artwork remains unchanged. [campaign-art-provenance.json](public/images/campaign-art-provenance.json) is the exact prompt/source/output record; it is not an archive of the image tool's generated original files. Do not alter those recorded prompts or describe these paintings as documentary photographs.

The four original square landmark paintings still link to their existing pages. Blossom art remains beside the notebook introduction, and the original panoramic night illustration closes the page. Real guest/trip photography remains in the gallery.

### Buttons and choices

Underlined actions use transparent backgrounds, a single bottom rule, a 44px minimum height and the label typography. Hover moves text to the deep-leaf accent; the campaign tour link also moves its arrow. The notebook copy action is a full-width spruce rectangle with near-white text, 14px 18px padding and a 48px minimum height. No extra hover treatment is defined for the copy button.

The header enquiry action is a square outline button; its hover fills with spruce and switches text to near-white. Choice buttons are rectangular outlines, at least 44px high, with 10px 14px padding; selected choices fill with spruce and expose aria-pressed. Shared disabled buttons use opacity .5 and a wait cursor.

### Cards and comparison

Tours are unboxed editorial items with intact square product posters, setting, a save toggle, explicit product title, description, tabular price and ruled booking link. Prices and operating details are read from lib/tours.ts and existing tour pages; design examples are not a second source of commercial facts.

The comparison table sits on soft sage with horizontal overflow and a 580px minimum table width. It retains clear column headers and links to existing tour details.

### Fields, disclosures and notebook

The optional date field is a transparent, square-cornered outline with a 48px minimum height and 10px padding. Its visible hint must continue to say that the date is a notebook note, not an availability search. No custom error styling is defined.

Finder and notebook summaries have top rules, meaningful headings and a plus indicator that rotates when open. Preserve all companion and interest choices, immediate suggestion feedback, family guidance and group enquiry routing. Saved tour IDs persist in the browser-local notebook; the optional date is component state. The notebook supports removal, copy and a selectable-text fallback. It is a shortlist, not a confirmed reservation or timed itinerary.

### Navigation, focus and feedback

The homepage header is 84px high on desktop and 62px on mobile. The three-link chapter navigation provides tour, preference and notebook anchors; its mobile treatment is described in Layout. Preserve menu, account, booking, group enquiry and gallery controls.

Homepage interactive elements receive a 2px deep-leaf focus outline offset by 5px; links on the dark group block use near-white focus. Preserve visible focus, semantic controls, pressed/expanded/current states, accessible image alternatives and live feedback. Do not substitute color alone for state.

## Do's and Don'ts

### Do:

- **Do** use the near-white, spruce and soft-sage roles for new homepage UI.
- **Do** keep panoramic campaign imagery separate from intact square product posters and landmark originals.
- **Do** preserve original source artwork and the exact derivative prompt record.
- **Do** preserve existing tour, account, booking, comparison, notebook, enquiry and gallery behavior.
- **Do** keep manual controls, visible keyboard focus and the campaign's motion-off and reduced-motion paths.
- **Do** deliver this redesign as a preview for owner review; obtain owner authorization before merging or promoting production.

### Don't:

- **Don't** restore the superseded dark two-panel cover, paper mount or SUITE homepage display requirement.
- **Don't** crop product poster lettering, cover it with controls or introduce a hover zoom that crops it.
- **Don't** represent a saved notebook or optional date as a reservation or live inventory result.
- **Don't** invent reviews, ratings, prices, operating details or business claims.
- **Don't** claim that this homepage redesign globally replaces typography or shared styles on other routes.
- **Don't** add automatic cycling or continuous title motion to the manual campaign cover.
