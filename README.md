# Notun Kichu

**প্রতিদিনের জীবনে নতুন কিছু।** Notun Kichu is a responsive Bengali-language storefront for a Dhaka lifestyle and gift shop, featuring thoughtfully selected, unusual and practical products.

The site is designed for a polished mobile shopping experience while remaining comfortable to browse on desktop. It uses the shop’s brand assets, Bornomala Bengali fonts, individual product photography and a warm, glass-inspired visual style.

## Features

- Responsive storefront with dedicated Home, Shop, Product, Cart, Checkout, About and Contact pages.
- Product catalogue with category filters, search, product details and suggested prices.
- Favorites and cart saved in the visitor’s browser.
- Checkout inquiry prepared for WhatsApp review and sending.
- Contact information, showroom location and an embedded map.
- Bengali typography with locally hosted Bornomala Regular and Bold fonts.

## Technology

- React
- React Router
- Vite
- CSS

## Run locally

Install a current version of Node.js and npm, then run:

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Build and preview

Create a production build and preview it locally:

```sh
npm run build
npm run preview
```

The static production files are written to `dist/`. The `public/_redirects` file provides a single-page-app fallback on hosts that support Netlify-style redirects. Configure an equivalent route fallback when deploying to another static host.

## Project structure

```text
src/
  App.jsx       Pages, shared components and storefront interactions
  catalog.js    Product and category data
  main.jsx      React application entry point
  styles.css    Responsive design system and page styling
public/
  _redirects    Client-side route fallback for compatible hosts
  assets/       Product, brand and font assets served by the site
```

## Product content and order handling

Product prices shown on the site are **suggested estimates**, not a confirmed price list. The shop should verify product availability, final prices and delivery charges before confirming an order. Some studio product visuals are illustrative and may differ from the exact stocked item, including its model, colour or finish.

The checkout page prepares an order inquiry and opens WhatsApp for the customer to review and send. This project does not currently include online payments, an order database, live inventory management or an administration dashboard.

## Shop contact

- **Phone:** 01884-271997 / +880 1884-271997
- **Email:** [notunkichu2k26@gmail.com](mailto:notunkichu2k26@gmail.com)
- **Showroom:** 5th Floor, Infinity Building, Mirpur 12, Dhaka, Bangladesh
- **Website:** [notunkichu.store](http://notunkichu.store/)
