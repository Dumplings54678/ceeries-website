# Publishing CEERIES to a real, shareable website URL

The supplied code is a **Node.js application**, not a standalone HTML site. It must be published to a Node.js hosting provider to keep the instructor-required GET APIs functional.

## Recommended: GitHub + Render

1. Create a **public GitHub repository** for the CEERIES project. Upload everything from inside this project folder (including `assets/`, `data/products.json`, `data/customers.json`, `app.js`, and `server.js`). Do **not** upload real customer records, email addresses, passwords, or API keys.
2. In Render, connect that GitHub repository and create a **Web Service**. You can also use the provided `render.yaml` as a Blueprint.
3. Choose the `Node` runtime, **Build command** `npm install --omit=dev`, **Start command** `npm start`, and **Health check** `/health`. Render sets the `PORT` environment variable automatically.
4. Wait for the service to finish deploying. Render will display the real URL assigned to your service. Copy **that** URL into your Final Project submission and PDF. Do not invent a URL in advance.
5. Verify these addresses on your assigned domain:
   - `https://YOUR-ACTUAL-RENDER-DOMAIN/` (homepage)
   - `https://YOUR-ACTUAL-RENDER-DOMAIN/#/shop` (shop)
   - `https://YOUR-ACTUAL-RENDER-DOMAIN/#/contact` (contact)
   - `https://YOUR-ACTUAL-RENDER-DOMAIN/#/api` (API demonstration)
   - `https://YOUR-ACTUAL-RENDER-DOMAIN/api/products` (7 JSON products)
   - `https://YOUR-ACTUAL-RENDER-DOMAIN/api/customers` (3 fictional JSON customers)
6. Test the hosted cart, demo checkout, contact form, newsletter preview, gallery, and mobile menu.

### Before making CEERIES public

- Replace screenshot-derived temporary images with the original high-resolution Ceeries files and original promotional video.
- Add verified company address, official social profiles, phone/email, and business hours where appropriate.
- The checkout is a **classroom demonstration** only. No actual payments, shipping, live tracking, registration, or email delivery are supported.
- The account and order history are saved **only in each visitor's browser**. Changing browsers or clearing browser data loses this demo information. Form submissions validate but do **not** store personal contact information or send mail.
- The example customer API contains fictional records only.
- For a real commercial store, rebuild the backend with authenticated accounts, production database, order management, data-protection controls, transactional email, and a payment provider.

If you connect a Render/GitHub integration in ChatGPT, I can help publish the project there once account access is authorized. Without an authenticated hosting destination, the archive is only locally runnable; it does **not** have a genuine public internet address yet.
