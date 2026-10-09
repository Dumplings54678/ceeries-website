# CEERIES — Publish-Ready Interactive Final Project

An interactive, responsive classroom storefront for CEERIES Hydra Slay Lip Oil, built from the reference screenshots. It includes the assigned website sections, marketing mockups, and the instructor-required GET APIs. The header, product gallery, checkout demonstration, account screens and site navigation are interactive.

## Start locally

Install **Node.js 18+**, open this directory in VS Code, then run:

```bash
npm start
```

Open **http://localhost:4173** in your browser. You do not need to install third-party packages. `http://localhost:4173` works on your own computer only; it is **not a public link**.

### Website pages

- Home, including hero, product carousel, About, testimonials, purpose, FAQ, media, and newsletter preview
- The Formula — product features
- Lip Oils — seven shade products, search, filter, sorting, product descriptions and color options
- Individual products — product-photo zoom, quantity, Add to Cart, Buy Now, related products
- The Edit / Model Gallery — carousel and large-image viewer
- Contact — validated demo message form, **no delivery or personal data collection**
- My Orders — browser-local demo order history
- Account — browser-local profile, address, mock wallet preference (**no payment card data**)
- Cart, checkout and confirmation — simulated orders only, not real purchases
- Social Marketing Campaign `#/campaign` and Email Marketing Mockup `#/email`
- API demonstration `#/api`

### API integration

- `GET /api/products` — seven publicly viewable CEERIES shade records.
- `GET /api/customers` — three **fictional** sample customer records.
- `GET /health` — Node service health check.
- `POST /api/orders`, `/api/contact`, `/api/subscribe` — non-commercial classroom demo endpoints. **No customer or form PII is stored on the server**; the order history remains in the individual visitor's browser.

### Audit status

**20/20 automated local tests passed** (server HTTP checks + isolated Chromium UI browser tests). See `docs/testing/TEST_RESULTS.txt`, `docs/AUDIT_REPORT.md`, and desktop/mobile screenshots in `docs/screenshots/`.

### How to get a public website link

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for an exact GitHub + Render walkthrough, plus the included `render.yaml`. Connecting to an authorized hosting account is required. A real `https://...` URL cannot be generated just by running the project locally.

### Important final-project details

- The current visuals were cropped from submitted reference screenshots. Replace the temporary images with the original high-resolution brand assets and original promotional video before public evaluation.
- Official CEERIES social URLs and verified contact details have not been provided. Unverified social icons lead to the Contact page instead of pretending to be real official accounts.
- This is an **educational demo**, not a live commerce or email system. No payments are charged, no email or contact message is delivered, and order tracking is illustrative.
- Hash-based page navigation retains the original site concept. Advanced search-engine indexing of individual product routes would require server-backed URLs for production.
- The bundled PDF is a **documentation draft** that still needs the group's names/contributions, final website and GitHub links, and the original media.

## Files

- `index.html`, `style.css` — website structure and style
- `app.js`, `enhancements.js`, `qa.js` — interactive pages and refinements
- `server.js`, `package.json` — Node backend and scripts
- `data/products.json`, `data/customers.json` — GET datasets; all examples are safe demo data
- `assets/` — images, logo, and temporary promo montage video
- `render.yaml`, `DEPLOYMENT.md` — public hosting preparation and instructions
- `docs/` — screenshot, audit, and documentation draft
