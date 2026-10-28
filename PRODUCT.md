# Gyeongju Trip

<!-- impeccable:product-schema 1 -->

## Platform
web

## Purpose and audience
Gyeongju Trip is a local cultural tourism company. This website helps visitors choose docent-led Gyeongju tours and continue to the existing tour details and booking flows. School, company, MICE and private group visitors can request custom planning. These facts come from the existing site.

## Product truth

- Three existing tours are available: National Gyeongju Museum, Bulguksa·Seokguram History Tour and Silla Starlight Night Walk. Prices, meeting points, minimum departure numbers and operation times remain authoritative in lib/tours.ts. Homepage editorial routes and companion guidance are recorded in lib/tour-editorial.ts and mirror existing product detail pages.
- The homepage presents three visible scene choices, an existing real photograph for the selected tour, a schematic course and explicit operation facts. The night route connects Donggung and Wolji, Cheomseongdae and Woljeonggyo; the temple route includes Seokguram.
- Adult/child controls estimate the cost for 1–20 people using the shared calcAmount function. An inline three-tour comparison uses the same party and pricing source. This calculation does not reserve inventory or transfer party counts into checkout; visitors select them again when booking.
- Optional companion selection shows guidance for families, couples/friends, solo visitors or school/company groups. It does not infer an interest profile or a companion choice.
- The always-visible travel notebook persists saved tour IDs, optional date, explicit companion selection and adult/child counts in this browser under gjtrip-travel-note-v2. Legacy v1 saved-ID arrays migrate without an inferred companion. Visitors can remove tours and copy the notebook; clipboard failure reveals selectable text, and blocked storage is explained.
- A date is a local notebook note, not an availability query. The notebook is a shortlist, not a reservation, confirmed itinerary or single-day schedule. Copied notes include routes, operating/meeting details, party estimates and existing tour-page links.
- Preparation FAQs, actual tour photography, group-planning enquiry, illustrated landmark links and contact information support the choice. Existing account, payment, tour detail, booking, company and local-news destinations remain available.

## Owner's design commitments
The owner selected STAYFOLIO's campaign/editorial reference, asked for motion typography, and prefers Gyeongju imagery and brand atmosphere. The owner asked to use their watercolor artwork and delegated composition decisions. The latest request authorizes whole-homepage development and a bold transformation of UI, image color and typography, prioritizing generous space. Existing original artwork remains available; derivatives must be traceable in public/images/campaign-art-provenance.json. No new raster was created in this iteration. The current visual implementation is recorded in DESIGN.md and its .impeccable/design.json sidecar.

## Release and accessibility
Deliver a preview for owner review; do not merge or promote production without authorization. Preserve semantic header/main/footer landmarks, mobile layouts, keyboard focus, accessible states and reduced-motion support. Escape closes the mobile menu and returns focus to its trigger. Campaign editions change manually; the night artwork loads after first selection. Gallery autoplay starts off and requires an explicit play action. No invented reviews, ratings or business claims.
