# Notun Kichu storefront

Responsive React storefront built with Vite and React Router.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The production files are written to `dist/`. The included `public/_redirects` enables client-side routes on hosts that support Netlify-style redirects.

## Pages

- `/` home
- `/shop` product catalogue and filters
- `/product/:id` product detail
- `/cart` saved cart items
- `/checkout` WhatsApp order inquiry
- `/about` about the shop
- `/contact` contact information

Cart and favorites are stored in the browser. The WhatsApp form prepares an inquiry for the customer to review and send. No payment gateway, order database, inventory service, or admin dashboard is connected yet. Product prices and fulfillment terms need to be confirmed by the shop.

Product images are individual generated studio visuals based on the provided showroom photo. They are illustrative and may not exactly match the stocked product's model, color, or finish.
