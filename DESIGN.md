# Gyeongju Trip — Local Travel Studio

This direction supersedes the rejected generic product-hero homepage. The website is a place to choose a trip, not just a stack of advertisements.

## Visual language
- Warm paper #f4f1e9, charcoal #242b27, restrained vermilion #b64025.
- Hahmlet for Korean editorial titles, Barlow Condensed for the masthead, chapter numbers and English display; Noto Sans KR for controls and body copy. Fonts self-host through Next/font.
- Asymmetric photo cover, oversized daylight/nightfall type, ruled sections, staggered tour collection. No repeated centered hero blocks, gradients as decoration, or generic pill cards.
- Real Gyeongju and tour photographs. Homepage scopes the new typography; readable operational pages retain their body system.

## Product experience
1. Change the cover between Gyeongju by day and night, on request with no automatic cycling.
2. Pick a companion and interest to see an immediate tour suggestion. Groups route to custom planning. Family guidance states guardian requirements.
3. Optional travel date is a note, explicitly not a live inventory search.
4. Compare all three tours using the same prices as lib/tours.ts.
5. Save selected tours into a browser-local travel notebook, remove individually and copy for companions. It is a shortlist, not a booked or timed itinerary.
6. Continue to existing tour details, booking/account or group quote flows.

## Quality gates
- SSR default content remains useful. Client state is hydrated without mismatches. Invalid storage fails safely.
- Mobile 320/390px through desktop 1440px: no horizontal overflow, clear tap targets and readable labels.
- Keyboard-visible focus, pressed states, live result feedback, reduced-motion support, semantic headings and image alternatives.
- Browser test day/night, all suggestion combinations, comparisons, save/remove/persistence/copy, date note, menus and existing links.
- Production build and Vercel preview before production release.

## Original illustration integration
- Four existing landmark illustrations form an illustrated postcard index linking to the existing landmark pages. Preserve square artwork without cropping.
- Blossom artwork is a small paper postcard beside the notebook introduction, leaving all controls and text readable.
- The original panoramic night illustration closes the page, after the studio statement and before contact information.
- Photo-led cover and real tour photographs retain their existing role. No new images or altered artwork.
- This change is preview-only pending owner review; do not merge or promote to production without approval.

## Store product images
Use the existing product-smartstore-museum/night/bulguksa assets for the homepage collection and suggestion result. Keep 1:1 frames, no cropping, no text/icon overlays, and no hover zoom that crops lettering. Editorial numbering sits above each image.

## Mobile page length
Below 761px, tour and landmark collections use manual scroll-snap rails with visible next-card previews, dot navigation, previous/next controls, keyboard arrows and counts. Keep tour artwork square. No autoplay for purchasing decisions. Desktop grid stays unchanged. Forms, notebook and company content remain linear.
