Authored under explicit creative delegation

# Sorol Wash: BRIEF

Source of truth: `SOROL_WASH_SPEC.md` (§2 copied verbatim below). Build decisions that differ from the spec are listed at the end.

## 2. `scroll-craft` Step 0 & Step 1 Brief (`BRIEF.md` Specification)

When initializing `<workspace>/builds/sorol-wash/BRIEF.md`, mark the top of the file with:
`Authored under explicit creative delegation`

### 2.1 The 8 Core Interview Answers
1. **Vibe (3 to 5 words) & References:**
   - **Vibe:** *Obsessive, Hydro-Gloss, Effortless, Contrast-Driven, Tactile.*
   - **Visual References:**
     1. *Porsche Commercials in Wet Dark Studios* (specular water beads, anamorphic reflections on black paint, precision overhead strip lighting).
     2. *Dyson / Braun Product Engineering* (clean functional clarity when presenting the 11 detailing treatments and steam sanitization).
     3. *Architectural Daylight Courtyards* (crisp, bright, hygienic daylight section for the "at your home/office parking" convenience story).
2. **The Scroll Journey (Section by Section):**
   - **Act 1 (Hero):** The "Hydro-Wave Transformation": a luxury black Porsche Macan SUV in a dark, wet studio lit by overhead LED strips where a slow-motion wave of thick white snow-foam and crystal water sweeps front-to-back under scroll scrub, turning dull paint into a mirror-gloss finish as the headlights ignite.
   - **Act 2 (How It Works, Daylight Inversion):** Hard-cut to a crisp, sunlit architectural stone ground: a quick 3-step breakdown showing how Sorol Wash arrives at the client's home or office parking with all equipment.
   - **Act 3 (Interactive Service Configurator):** 3 sleek visual category cards (*1. Exterior & Wheels*, *2. Deep Interior & Steam*, *3. Polish, Wax & Full Detailing*) containing all 11 services as selectable interactive pills that dynamically build the user's WhatsApp message.
   - **Act 4 (The Engineered Peak, Transformation Stage + Reels Rail):** An interactive Before/After wipe comparison (with 3 instant tabs: *Upholstery & Seats*, *Rims & Tires*, *Exterior Paint & Gloss*) where scroll drives the seam until the user's first touch/drag, paired directly above a horizontal pan rail of 4 to 5 real work-in-action vertical clips and an Instagram portal.
   - **Act 5 (The Resolved Close):** The user's accumulated **Detailing Docket** docks into a final specification plate with a primary WhatsApp CTA (`תיאום בוואטסאפ`, pre-filled with their exact chosen services), a secondary Instagram button, and a tertiary direct phone call link.
3. **The Energy Curve:**
   - Opens with **high cinematic drama** (Act 1 nocturnal studio scrub) → drops into **calm, airy clarity** (Act 2 daylight 3-step convenience & Act 3 tactile service selection, followed by a brief 0.55vh authored silence interlude into deep slate) → surges to **maximum visual intensity** at the Peak (Act 4 full-bleed Before/After wipe + kinetic Reels rail) → settles into **confident, frictionless resolution** (Act 5 Docket summary & conversion).
4. **The Feeling Curve & The Peak:**
   - See Section 2.2 below for the formal Feeling Curve table.
   - **The Engineered Peak:** *"I watched the wipe peel back a stained family seat and oxidized rim to factory-new perfection, then grabbed the handle to inspect it myself right above real videos of the work."* (Lives in **Act 4**, owning the largest scroll span of `3.2vh`).
5. **The "Tell-Someone" Sentence:**
   - *"It's the site where scrolling sweeps a wave of snow-foam across a black Porsche to turn it into a mirror, and tapping the exact cleaning treatments your car needs builds your WhatsApp booking slip live at the bottom of the screen."*
6. **Aesthetic Family (`uniqueness.md §5`):**
   - **Contrast-Driven Hybrid (Nocturnal Studio + Daylight Editorial):** Combines the dramatic specular precision of `Nocturne / Low-Key Cinematic` (for the Hero and the Detailing Peak where water, steam, and gloss pop against `#080B10`) with a hard-cut inversion to `High-Key Daylight` (`#F3F5F8`) for the at-home convenience and service configurator.
7. **Structural Fork (`worldflight` vs. Distinct Scenes):**
   - **Distinct Scenes / Hard-Cut Hybrid Acts** (NOT `worldflight`). This keeps asset generation fast, allows blending the AI Hero video with real client photos/videos, and enables the deliberate hard-cut between the dark studio and bright daylight grounds.
8. **Available Assets:**
   - **Hero Video:** AI-generated "Hydro-Wave Transformation" clip (Porsche Macan in wet studio, encoded via `encode.sh` for smooth frame-by-frame scroll scrubbing with an extracted first-frame poster).
   - **Brand Identity:** Existing Sorol Wash logo. Single-hue two-stop color palette defined by this specification.
   - **Real Work Media:** Client owns authentic Before/After photos and vertical action videos (foam, steam, interior extraction, rim cleaning) which will populate Act 3 and Act 4.

### 2.2 The Feeling Curve (`references/feel.md`)
Every adjacent act produces a distinct emotion. No two adjacent acts share a feeling:

| Act | Beat | Emotion | What on screen causes it |
| :--- | :--- | :--- | :--- |
| **Act 1** | Recognition & Awe | **Desire** | A slow-motion wave of snow-foam and water sweeps across a black Porsche Macan in a dark wet studio under the user's scroll; dull paint turns mirror-glossy and LED headlights ignite. |
| **Act 2** | Tension to Relief | **Relief** | Hard-cut from dark studio to bright, sunlit stone (`#F3F5F8`); 3 crisp steps reveal you never have to wait in a car wash queue again because Sorol Wash comes to your home or office parking. |
| **Act 3** | Range & Agency | **Control** | Tapping any of the 11 service pills inside the 3 visual category cards selects them with a solid accent border, fill, and checkmark, live-stamping them into the floating Detailing Docket bar. |
| **Interlude** | Authored Silence | **Anticipation** | A `0.55vh` hard-cut inversion back to deep wet obsidian (`#080B10`) with a single hairline rule and quiet 4-word kicker before the Peak opens. |
| **Act 4 (PEAK)** | Substance & Proof | **Conviction** | Full-bleed interactive Before/After wipe stage (Seats / Rims / Gloss) + horizontal pan rail of real steam and foam action videos proving the craft is 100% real. |
| **Act 5** | Commitment | **Confidence** | The floating Detailing Docket docks into the final inspection plate; one tap on `תיאום בוואטסאפ` opens WhatsApp with the exact selected treatments ready to send. |


---

## Authored silence (so verification can tell it from dead scroll)

- **Interlude, 0.55vh**, between Act 3 and Act 4: hard cut to deep obsidian, one hairline, the line `התוצאה מדברת בעד עצמה.` Nothing else moves. It exists so Act 4 lands.

## Build decisions that differ from the spec (and why)

1. **Hero media is the supplied clip (replaced 2026-11-06 with `Porsche_Macan_washed_with_foam_93e71b70_1080p.mp4`) and it AUTOPLAYS on entry instead of scrubbing.** Owner request: on the owner's machine the scroll-scrub never advanced, and they want the video to play when they land. A blue-hour home driveway: the Macan starts fully covered in foam, a pressure wash strips it to mirror black while the camera pushes in, and the headlights ignite at the end. The clip plays once, muted, and holds on the lit headlights; it resets and replays whenever the hero re-enters the viewport. The headline and CTA are visible from the first frame, step aside at 2.2s (before the push-in carries bright water under them), and one centred `תיאום בוואטסאפ` returns when the clip ends. Reduced motion keeps the poster and the original copy. Phones get a 9:16 crop whose window pans with the car (centre 30% to 58% of the frame, eased); the poster is that crop's first frame. This departs from the skill's scrub-only hero, by request.
2. **Act 4 rail is driven by page JS, not `data-sc-pan`.** The engine maps pan across the whole act and translates negative X, which is the wrong direction in RTL and cannot start at the act's midpoint. The rail is a native RTL flex row, moved with positive X over p 0.5 to 1.
3. **Act 4 runs in two phases** (wipe, then rail) on every viewport so the wipe handle, tabs, rail and Docket never compete for one phone screen.
4. **Before/After**: the client has supplied "after" photos only. Each tab pairs a real after photo with a clearly labelled placeholder "before" slot (`תמונת "לפני" בקרוב`). No fake before is generated or derived from the after photo. Dropping real befores into `BA_PAIRS` in `sorol.js` turns each pair live.
5. **Tabs match the photos we actually have**: interior and seats, exterior and wheels, paint gloss. They map to the three Act 3 categories.
6. **Hero foreground plane is CSS atmosphere (haze), not a photographic alpha cutout**, because no alpha asset exists and none was generated. It moves at its own rate for real depth separation.
7. **WhatsApp message uses a `•` bullet** instead of `*`, because WhatsApp reads `*text*` as bold.
8. **Category header stills are frames from the supplied reel**, so Act 3 and Act 4 do not repeat the same photographs.
9. **Placeholder contact details** live in `SOROL_CONFIG` at the top of `sorol.js` (WhatsApp number, phone, Instagram). The number is a placeholder until replaced.

10. **Hero headline (owner, 2026-11-06):** `שטיפה ברמת סטודיו. עד לחניה.` replaces `ברק של אולם תצוגה. אצלך בחניה.`, set as three meaning-based lines.
11. **Hero autoplays for every visitor, including prefers-reduced-motion (owner decision, 2026-11-06).** The owner's own machine has animations off and the poster-only fallback was unacceptable to them. The clip is muted, plays once (7.9s) and holds; a pause button is shown while it runs (WCAG 2.2.2), and a play button appears if a browser refuses autoplay. The rest of the page still honours reduced motion.
12. **Two hero clips, chosen by screen orientation (owner supplied a native portrait render, 2026-11-07).** `hero-portrait.mp4` (720x1280, 1.6 MB) for portrait screens, `hero-landscape.mp4` (1920x1080, 2.3 MB) for landscape. Chosen with `(orientation: portrait)`, not width, so a tall narrow desktop window and a portrait tablet get the portrait clip while a landscape phone gets the landscape one. Rotating a device swaps the clip and keeps playing. Posters match each clip. Both are encoded for playback (not the dense-GOP scrub encode the skill uses) because the hero no longer scrubs.
13. **Responsive model.** Everything is in rem and the root font steps up at 1700, 2200 and 3000px, so large and 4K screens get a proportionally larger page. The hero copy is a right column in landscape and a full-width bottom band in portrait; its headline is sized from the container (`cqi`), so it fits any column. Docket stacks on phones narrower than 420px. Landscape phones get trimmed hero and wipe layouts. Verified on 14 viewports from 320x568 to 3840x2160.
14. **Booking form replaces the closing plate.** Optional name, car model, parking area and note feed the WhatsApp message (`שם:`, `רכב:`, `אזור חניה:`, `הערות:`); the parking-area line is always present. Nothing is stored or sent anywhere except the WhatsApp link the visitor opens.
15. **Footer** is a real footer: brand and CTA, site links, contact (WhatsApp, phone, Instagram), service area, copyright, back to top.
16. **Performance.** Self-hosted Heebo and Rubik (Hebrew and Latin subsets, about 87 KB, no third-party requests); hero first load 2.5 MB on phones and 3.3 MB on desktop (about 8 MB before); the reel clip loads only when the visitor is within about 1.5 screens of it; the haze layer and the grain overlay are gone on phones; every tap target is at least 44px.


## Update: real before/after photos (2026-11-07)
- Four real pairs now drive the act 4 wipe: Hyundai interior (before frame taken from the walkthrough clip, so it is lower resolution), Suzuki exterior, Cupra exterior, Hyundai exterior. Tabs are labelled by car (factual), not by treatment, because the work performed on each car is not recorded.
- Before and after shots are not framed identically (different angle or distance); the wipe is honest about that rather than faked.
- Rail gallery: Suzuki rear, Cupra rear, two Mercedes, light leather interior, then the Instagram card.
- Every readable licence plate (the client's and other cars') is blurred before publishing. A Cupra interior photo showing driver hand controls was deliberately not used.
- Asset names say what the file is: `ba-<car>-before|after`, `gallery-*`, `card-*`, `reel-showcase*`, `hero-*`.

## Update: act 4 split, silver wordmark (2026-11-07)
- Act 4 was one pinned scene (wipe, then gallery). Dead scroll: once a visitor touched the wipe, scrolling moved nothing until the gallery phase. It is now two parts: 4a "proof" is a normal section (the wipe plays itself once on entry, then it is the visitor's), and 4b is a pinned gallery that moves sideways from the first scroll to the last, eased (never jumps), with a hint that fades after the first flick and a progress bar.
- Wordmark: Syncopate (self-hosted, OFL) in brushed-silver gradient, slanted SOROL over a thin, spaced WASH, echoing the logo lettering. The logo ring is silver instead of cyan.

## Update: before/after set trimmed (2026-11-07)
- Pairs are now three, in this order: Suzuki (labelled as colour enhancement and full detailing), Hyundai interior, Hyundai exterior. The Cupra exterior pair was removed.
- On phones the before/after frame is 4:5 and full width, so the change is easier to see. Spacing above and below the result is tighter.
- Wordmark: SOROL WASH on one line in a chrome gradient, without the skew or drop shadow that blurred the text.

## Update: two pairs, new polish card photo (2026-11-07)
- Before/after is down to two pairs: Suzuki (colour enhancement and full detailing) and Hyundai interior. The Hyundai exterior pair was removed.
- The "השבחת צבע ודיטיילינג מלא" service card now shows a full-car photo (Suzuki, rear three-quarter, plate blurred) that is not used anywhere else on the page.

## Update: act 4 played by scroll again, now without dead stretches (2026-11-07)
- One pinned scene: Suzuki seam sweeps before to after, the frame dips and swaps to the Hyundai interior, which sweeps the same way, then the gallery slides across (fast), then the page continues normally. Every part of the scroll moves something.
- Dragging the handle overrides the seam only until the next scroll, so it can never freeze the page. Tabs scroll the scene to that pair. With reduced motion the tabs just switch pairs and the layout is static.
