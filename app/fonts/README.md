# Bundled fonts

## Pretendard Variable — homepage

Pretendard Variable by Kil Hyung-jin, with the copyright holders and reserved font names listed in OFL-Pretendard.txt. Licensed under the SIL Open Font License 1.1.

Source: https://github.com/orioncactus/pretendard
Downloaded unchanged from:
https://raw.githubusercontent.com/orioncactus/pretendard/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2

Bundled file: PretendardVariable.woff2
SHA-256: 9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4

The download URL follows the upstream main branch; no pinned upstream revision is claimed. The checksum identifies the exact bundled file. See OFL-Pretendard.txt for the full license and copyright notices.

Loaded through next/font/local in app/page.tsx; weight range 100–900, display swap, variable --font-pretendard. The variable is applied to the homepage main element. The campaign display, main homepage UI and masthead use Pretendard; this does not replace the root font on other routes.

## SUITE Variable — existing site system and homepage fallback

SUITE Variable by Sun (sun-typeface), licensed under the SIL Open Font License 1.1.

Source: https://github.com/sun-typeface/SUITE
Pinned revision: a114fec078bfcbdc93a7b2190510ab83de2a2d40
Original file: fonts/variable/woff2/SUITE-Variable.woff2

The original font is bundled unchanged. See OFL-SUITE.txt for license and copyright.

Loaded through next/font/local in app/layout.tsx; weights 300–900, display swap, variable --font-suite. SUITE remains the root UI font for existing routes and a fallback in most homepage type stacks.

## Other existing families

app/layout.tsx also loads Hahmlet, Barlow Condensed and Noto Serif KR through next/font/google. Their setup is unchanged by the homepage redesign. Barlow Condensed remains the explicit accent for shared gallery caption numbers and the gallery count. These Google-font families are not the two locally bundled files documented above.
