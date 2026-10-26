# Gyeongju Trip — Local Travel Studio

## Campaign poster and motion refinement (2026-10-26)
The owner selected the STAYFOLIO campaign/editorial reference and requested sophisticated motion typography, while prioritising Gyeongju photography and brand atmosphere. This supersedes the quieter photo-and-serif cover. Preserve the existing photographs, square store artwork, illustrations, factual copy, prices and booking destinations.

- Pair a forest-green typographic poster with an unobstructed Gyeongju photograph. Day uses #243e36, night uses #283338, with #f5f1e8 lettering and #c9d5bd / #d0ccba supporting details. Keep controls and captions outside the photograph.
- Use the existing self-hosted SUITE face for the homepage display and collection headings. Two masked lines arrive with a 780ms exponential ease-out and a 100ms second-line delay. This is the single focal sequence, repeated only when the visitor changes day/night or re-enables motion.
- Photos crossfade over 480ms when day/night changes. A supported desktop scroll timeline moves the title by at most 24px as the poster exits. There are no timers, continuous loops, scroll event handlers or new animation dependencies.
- Provide a motion-off control that settles the cover immediately. Respect prefers-reduced-motion with static typography, no spatial motion, a short 120ms image crossfade, and an explicit system-preference label. All content renders on the server and is readable without JavaScript.
- Stack type and photo on mobile, keeping the main tour link visible before the photograph. Retain manual day/night switching with pressed states and live story/caption updates.
- Remove repetitive English section labels, arbitrary collection numbering, split-colour headings and the oversized closing wordmark. Keep photographic captions and meaningful carousel position indicators.
- Keep product images intact, with consistent title, price and action alignment. Show landmarks as unboxed illustrations. Use ruled rows for optional planning tools.
- Preserve comparison, all companion/interest choices, local notebook persistence/copy, group enquiries, gallery controls and mobile swipe rails. Product details, account, payment and AI services are outside this visual change.
- This refinement remains a preview until owner review, as required by the existing release rule below.

References: [vibe.itji's post](https://www.threads.com/@vibe.itji/post/De6Ofeij72o), [Impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark).
Applied Impeccable animate and craft-floor guidance for the campaign update, following the earlier distill/polish pass. Hallmark principles were reviewed as secondary evidence; no Hallmark theme rebuild or browser-linter run is claimed. Visual reference: [STAYFOLIO](https://www.stayfolio.com/), selected by the owner after viewing the live campaign homepage.

This direction supersedes the rejected generic product-hero homepage. The website is a place to choose a trip, not just a stack of advertisements.

## Visual language
- Warm paper #f4f1e9, charcoal #242b27, restrained vermilion #b64025.
- SUITE for homepage display titles, controls and body copy; Barlow Condensed for the masthead. Fonts self-host through Next/font. Existing typography on other routes is outside this change.
- A two-panel campaign cover, generous margins, ruled sections and aligned tour collections. No repeated centered hero blocks, gradients as decoration, or generic pill cards.
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
Use the existing product-smartstore-museum/night/bulguksa assets for the homepage collection. Keep 1:1 frames, no cropping, no text/icon overlays, and no hover zoom that crops lettering.

## Mobile page length
Below 761px, tour and landmark collections use manual scroll-snap rails with visible next-card previews, dot navigation, previous/next controls, keyboard arrows and counts. Keep tour artwork square. No autoplay for purchasing decisions. Desktop grid stays unchanged. Forms, notebook and company content remain linear.

## Browse-first revision (2026-09-29)
Research: STAYFOLIO /ko (editorial collections, exploration/bookmarks), MyRealTrip (clear product names and prices), GetYourGuide /ko-kr (duration and price alongside experiences).
Show tours immediately after a shorter mobile cover; sticky mobile jump navigation. Put the optional preference form and notebook behind native disclosures. Remove the duplicate recommendation product image entirely, and remove the large tour photograph below the notebook. Keep a compact school/company/private inquiry block. Retain store artwork and original illustrations. Product names and booking links are explicit. Still preview-only pending approval.
