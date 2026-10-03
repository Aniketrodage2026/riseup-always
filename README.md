# Jivan Urja — Ayurvedic knee care

A standalone Next.js App Router application using TypeScript, React and Tailwind CSS. Built from the supplied Lovable UI and its two image assets, with clinic content adapted from [jivanurja.com](https://www.jivanurja.com/). The existing `ToDOList` application is untouched.

## Run locally

Requires Node.js 20.9 or later. Dependencies are already installed in this workspace.

```powershell
cd C:\Users\91957\Desktop\stack\react\todo-list\jivan-urja
npm.cmd run dev -- --port 3001
```

Open http://localhost:3001. Port 3000 was already serving another application during development. On macOS/Linux, use `npm` in place of `npm.cmd`.

## Production and validation

### Render Static Site

Use these settings for the existing Render Static Site:

- Branch: `main`
- Root Directory: leave blank (the GitHub repository already contains this app at its root)
- Build Command: `npm ci && npm run build:static`
- Publish Directory: `out` (not `dist` or `.next`)

Save the settings and deploy the latest commit. `render.yaml` supplies the same configuration for a new Render Blueprint; adding it does not automatically update an existing manually configured service.

`build:static` enables Next.js static export and creates `out/index.html`, the guide page, JavaScript, CSS, fonts and images. Interactive features and the WhatsApp flow still work. Images are served directly because Render Static Sites do not run the Next.js image-optimization server. No SPA catch-all rewrite is needed; each page has its own exported HTML.

To preview the actual export locally, run `npm.cmd run build:static`, then `npm.cmd run preview:static` and open http://localhost:3108. You can run the browser tests against this preview by setting `$env:PLAYWRIGHT_BASE_URL = 'http://localhost:3108'` before `npm.cmd run test:e2e`.

### Next.js server hosting

The original server build remains available. After a static build, run the normal build again before using `npm run start`.

```powershell
npm.cmd run build
npm.cmd run start -- --port 3001
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test:e2e
```

The browser suite uses installed Google Chrome and a dedicated production server on port 3107. Build first. It checks desktop and mobile rendering, runtime errors, horizontal overflow, interactive knee exploration, service selection, appointment validation, message preparation, FAQs, mobile navigation, routing and automated accessibility. For a system without Chrome, install Playwright Chromium and remove `launchOptions.channel` from `playwright.config.ts`. To test an already-running local server, set `PLAYWRIGHT_BASE_URL` to its URL; the suite then leaves server lifecycle management to you.

## Features

- Responsive cream, forest green and sage design retaining the Lovable hero and section structure.
- Interactive knee illustration with keyboard-operable structure selectors.
- Concern selector that carries the chosen service into the consultation form.
- Validated consultation form with local-date validation, explicit consent, an editable review and a prefilled WhatsApp handoff.
- Expandable FAQs, mobile navigation, mobile contact bar and click-to-call links.
- Separate `/knee-treatment-guide` page and a custom 404 page.
- Next.js image optimization, locally bundled fonts, page metadata and an SVG site icon.
- Skip link, visible keyboard focus, live updates and reduced-motion support.

## Appointment behavior

The form is a working **WhatsApp request flow**, not an appointment database. It validates details in the browser and opens the clinic’s WhatsApp with a prepared message only when the visitor clicks Continue to WhatsApp. The visitor must tap Send in WhatsApp. A preferred time is not reserved; the clinic confirms availability. No message was sent during development or testing.

No database, AI service, admin dashboard, analytics, cookies, third-party tracking or environment secrets are required. Form values are held in page memory; reloading clears them. The care selector is navigational and does not diagnose or recommend a treatment.

## Editing

- `src/lib/clinic.ts`: clinic contacts, services and FAQs.
- `src/app/page.tsx`: homepage sections and supplied patient stories.
- `src/app/globals.css`: theme, typography and responsive layout.
- `src/components/knee-explorer.tsx`: knee illustration and interactive details.
- `src/components/care-finder.tsx`: concern-selection flow.
- `src/components/appointment-form.tsx`: form validation and WhatsApp message.
- `public/images/`: the two original Lovable image assets.

## Content provenance

The user-supplied ZIP provides the design, images and patient-story text. The old site was consulted only for clinic text, treatment process, qualifications, telephone, email and address. Its layout and images were not copied. Only the two required image assets were extracted; bundled environment variables, backend integrations, agent instructions and planning documents were not adopted as project instructions.

Basic knee anatomy was cross-checked against [AAOS OrthoInfo](https://www.orthoinfo.org/diseases--conditions/meniscus-tears/). The images are illustrative, testimonials are identified as experiences published by the clinic, and the copy avoids guarantees of cure or avoiding surgery. Clinic credentials and testimonials are reproduced from supplied/published content, not independently verified.

The project supports both Render Static Sites and Next.js server hosting. It is not connected to a booking backend.
