# Trendybass

**Fashion that fits your style.**

Trendybass is a fashion shop. It sells its own selection of clothes, shoes and accessories, and also shows products from partner shops. Shoppers can try clothes on a photo of themselves with AI, and see if a size will be tight, right or loose before they buy.

| | |
|---|---|
| **Website** | https://trendybass.com |
| **Status** | Scaffolding (MR-01) |
| **First market** | EU shoppers, English first |
| **Business model at launch** | Own shop (Trendybass sells, Stripe checkout) **and** affiliate (partner shops sell, Trendybass earns a commission) |
| **Signature features** | AI Try-On and Fit Check |
| **Development method** | Secure Software Development Lifecycle (SSDLC), two-week sprints |

> This README is a living document. Features, prices and plans will change as Trendybass is built and tested. Prices for outside services were checked in November 2026 and must be checked again before they are used for a budget.

---

## Contents

1. [The idea in one minute](#1-the-idea-in-one-minute)
2. [What we build first and what we do not](#2-what-we-build-first-and-what-we-do-not)
3. [Business model](#3-business-model)
4. [Shop website](#4-shop-website)
5. [AI Try-On](#5-ai-try-on)
6. [AI cost plan](#6-ai-cost-plan)
7. [Recommendations and Complete the Look](#7-recommendations-and-complete-the-look)
8. [Customer accounts](#8-customer-accounts)
9. [Admin](#9-admin)
10. [Technology](#10-technology)
11. [Design system](#11-design-system)
12. [SEO](#12-seo)
13. [Security and privacy](#13-security-and-privacy)
14. [Roadmap](#14-roadmap)
15. [How we work](#15-how-we-work)
16. [Principles](#16-principles)

---

## 1. The idea in one minute

1. A shopper finds a dress on Trendybass.
2. They tap **Try on**, upload one full-body photo and see the dress on themselves in about 10 to 30 seconds.
3. **Fit Check** compares their measurements with the dress: "Size M: chest regular, waist close, length a bit long".
4. Trendybass suggests shoes and a bag that go with it.
5. They pay on Trendybass (own products, Stripe) or tap **Buy at [shop]** for partner products.

**Why this can work:** most fashion shops show the same photos on the same models. Try-On shows the look, Fit Check answers "will it fit me?". Together they give shoppers a reason to buy here, and fewer returns.

**Honest limit:** an AI try-on shows roughly how a garment looks. It does not show how it fits. Fit is a separate feature built on real measurements (see [5.4](#54-fit-check)).

---

## 2. What we build first and what we do not

The first plan described everything at once: store, marketplace, outfit builder, loyalty, many markets. That is several years of work for one developer. The plan below keeps a real shop and the two signature features, and leaves the rest for later.

| | MVP (first public release) | Later, when there is a reason |
|---|---|---|
| **Catalogue** | A small curated range of own products, plus products from one or two affiliate networks | More suppliers, brand partners, own label |
| **Buying** | Own products: cart and Stripe checkout. Partner products: click through to the partner shop | Saved cards, more payment methods per country |
| **Orders** | Orders, stock per size and colour, shipping, returns and refunds for own products | Warehouse (3PL) integration |
| **AI** | Try-on for tops, bottoms and one-piece garments | Outfits with several garments, shoes and accessories |
| **Fit** | Fit Check per size from the shopper's measurements and the garment's measurements | Learning from returns ("runs small") |
| **Recommendations** | Similar items and Complete the Look from product data and image embeddings | Personal recommendations from shopping history |
| **Accounts** | Sign up, saved items, orders, measurements, try-on history | Saved outfits, wardrobe, style profile |
| **Admin** | Products, stock, orders, returns, feeds, categories, homepage, try-on usage and cost | Suppliers, purchase orders, advanced reports |
| **Languages** | English | Dutch, French, German |

**Not in scope until there is clear proof it is needed:** a multi-seller marketplace, an AI chat stylist, accessories try-on (jewellery, bags, glasses), loyalty points.

---

## 3. Business model

Two ways to earn from day one. Both use the same catalogue, the same Try-On and the same Fit Check.

| | Own shop | Affiliate |
|---|---|---|
| Who sells | Trendybass | Partner shop |
| Payment | Stripe on Trendybass | On the partner's site |
| Stock, shipping, returns | Trendybass | Partner |
| Income | Price minus cost, shipping and returns | Commission, typically a few percent to about 10 to 15% in fashion, depending on the programme |
| Fit Check | Full: we measure our own products | Only where the feed has garment measurements (often not) |
| Risk | Money tied up in stock, returns | Low, but low margin and the partner can stop the programme |

### 3.1 Where our own products come from

**Recommendation: buy small quantities from EU wholesalers and ship from the EU. No dropshipping from China.**

| Option | Verdict | Why |
|---|---|---|
| **EU wholesale, small own stock** (wholesale marketplaces such as Ankorstore or Faire, EU brands and wholesalers) | **Recommended start** | Known quality, fast delivery, we can measure and photograph every product for Fit Check and Try-On. Start with 20 to 50 products, 2 to 5 pieces per size |
| **EU dropshipping supplier** (suppliers that keep stock in the EU and ship for us) | Possible for extra range | No stock needed. Check delivery time, return address in the EU and product photos rights before signing |
| **Print-on-demand own label** (T-shirts, hoodies, printed in the EU) | Good for a first Trendybass label | No stock, own brand, but narrow product range |
| **Dropshipping from China** (AliExpress style) | **Not recommended** | Long delivery, uneven quality, and under EU law **Trendybass stays fully responsible** for the 14-day withdrawal right, returns and defects. Shoppers may not be sent to a foreign supplier for returns |

Every own product is measured flat (chest, waist, hips, length, sleeve) when it arrives. These measurements power Fit Check, and they are something partner feeds rarely offer.

**Payments:** Stripe Checkout (hosted payment page). Card data never touches our servers, which keeps PCI scope small (SAQ A). Payment methods common in the EU (cards, Apple Pay, Google Pay, iDEAL, Bancontact, Klarna where it fits) are switched on in Stripe, not coded one by one.

**Legal basics for the own shop:** company details, terms of sale, the 14-day withdrawal right with a clear withdrawal button, returns policy, VAT (OSS for sales to other EU countries), and product safety information.

### 3.2 Affiliate: where the products come from

| Step | What happens |
|---|---|
| Join networks | Apply to fashion programmes on affiliate networks. **Awin** is the largest in Europe and lists many fashion brands (for example Guess Europe, Victoria Beckham EU). Others: CJ, Impact, Rakuten Advertising, Partnerize, and fashion-only networks such as PrimeFashionAds in the German-speaking region. Start with Awin |
| Import feeds | Each network gives a product feed: title, price, images, sizes, colours, stock and a tracking link |
| Show products | Trendybass shows the products, with try-on where the garment type is supported |
| Click out | The shopper buys on the partner site. The network reports the sale and pays the commission |

**Things to check before building on a feed:**

- **Approval.** Many programmes only approve sites that are live and have real content. The site must look finished before we apply.
- **Image rights.** Feed images are licensed for showing the product. Using them as input for an AI try-on may not be allowed by every programme. **Ask each network or brand in writing** before try-on is switched on for its products.
- **Price and stock.** Feeds can be hours old. Show "price at [shop] may differ" and refresh feeds at least daily.
- **Tracking.** Confirmed sales only come from the network's reports. Clicks are not sales.

### 3.3 Possible extra income later

- Paid try-on credits beyond the free allowance
- Sponsored placement for brands, always marked "Sponsored"
- A try-on widget for small fashion shops (B2B)

---

## 4. Shop website

### 4.1 Home

- Featured collections and new arrivals
- Try-on introduction with a real example
- Trending items per category
- Shop by occasion (work, wedding guest, holiday, gym)
- Newsletter sign-up

Every section is managed in the admin, without code.

### 4.2 Product list

Built on [Baymard Institute's apparel research](https://baymard.com/research/apparel-and-accessories):

- Filters: category, price, size, colour, brand, shop, "try-on available"
- Sort: relevance, newest, price
- **Colour swatches on the product card**, not just on the product page. Baymard found 57% of sites fail to show all swatches in the list, so shoppers miss colours that exist.
- Filters stay in the URL, so a filtered page can be shared and indexed where useful

### 4.3 Product page

- Large photos with zoom, including at least one photo on a person where the feed has it
- Colours and sizes as buttons, not dropdowns
- Price, delivery and returns summary (own products: ours; partner products: the shop's)
- Size chart and garment measurements
- **Fit Check** per size when the shopper has saved measurements
- **Try on** button for supported garments
- Complete the Look and Similar items
- Own products: **Add to bag**. Partner products: **Buy at [shop]**, clearly marked as going to another website

### 4.4 Bag and checkout (own products)

- Bag with size, colour and quantity, kept for signed-in shoppers and guests
- Guest checkout allowed
- Stripe Checkout for payment. The order is only confirmed by Stripe's signed webhook, never by the browser
- Stock is reserved during checkout, so two shoppers cannot buy the last item
- Order confirmation and shipping emails with tracking
- Returns: request in the account or by link from the email, within the legal 14 days and our returns policy
- Refunds through Stripe from the admin

A bag can only hold own products. Partner products always go to the partner's site.

### 4.5 Categories at launch

Start with categories where try-on works best and affiliate supply is large:

- Women: dresses, tops, jeans and trousers, skirts, jackets
- Men: shirts and T-shirts, jeans and trousers, jackets
- Shoes and bags: shown in Complete the Look, no try-on

Categories and subcategories are managed in the admin.

---

## 5. AI Try-On

### 5.1 Shopper flow

1. Shopper taps **Try on** on a product.
2. If not signed in, they sign up (try-on needs an account: see [6.4](#64-limits-that-keep-costs-under-control)).
3. They upload one photo, or pick a photo they saved before.
4. A clear notice explains what happens to the photo. They confirm.
5. The job goes into a queue. The page shows progress.
6. The result appears with an **"AI-generated preview"** label.
7. They can try another colour, save the result, or tap **Buy at [shop]**.

### 5.2 What works and what does not

| Works well | Works poorly or not at all |
|---|---|
| Tops, T-shirts, shirts, jackets | Shoes, bags, jewellery, glasses, hats |
| Trousers, jeans, skirts, shorts | Several garments at once in one step |
| Dresses and jumpsuits | Very sheer, layered or heavily detailed garments |
| A clear front photo, one person, good light | Group photos, side views, crossed arms, busy backgrounds |

Garment types without try-on simply do not show the button.

### 5.3 Photo guide

The upload screen shows one example photo and three short rules: full body, facing the camera, plain background. Bad photos are the main cause of bad results, so the app checks the photo (one person, whole body visible, enough resolution) before it spends money on a try-on.

### 5.4 Fit Check

The try-on image is not proof of fit. Fit Check is. It compares the shopper's body with the garment, size by size, and says where it will be tight or loose.

**What the shopper enters once (saved in their account):** height, chest, waist, hips, inside leg, and preferred fit (slim, regular, relaxed). A short guide with a drawing shows how to measure. Shoppers who do not know their measurements can enter height, weight and usual size instead, and get a rougher estimate marked as such.

**What we know about the garment:** flat measurements per size (chest, waist, hips, length, sleeve, inside leg), the fit the brand intends (slim, regular, oversized) and whether the fabric stretches.

**How it works:** for each body area, garment measurement minus body measurement gives the room left (ease). Ease is compared with ranges for the garment type and fabric:

| Ease (example: woven top, chest) | Result |
|---|---|
| Less than 0 cm | **Too small** |
| 0 to 4 cm | **Tight** |
| 4 to 10 cm | **Close fit** |
| 10 to 18 cm | **Regular** |
| 18 to 28 cm | **Relaxed** |
| More than 28 cm | **Oversized** |

Stretch fabrics move the ranges down. Length is shown as **short**, **right** or **long** using height and inside leg. The ranges above are a starting point and are tuned with real returns data.

**What the shopper sees:**

> **Size M: Recommended**
> Chest: regular · Waist: close fit · Length: a bit long
> Size S: chest tight · Size L: chest relaxed

Then a clear verdict: **recommended size**, **size up** or **size down**, with the reason.

**Where it works:**

| Product | Fit Check |
|---|---|
| Own products | Always. We measure every product when it arrives |
| Partner products with measurements in the feed | Yes |
| Partner products with only a size chart (body sizes, not garment sizes) | A rough "your size is probably M" from the chart, marked as an estimate |
| Partner products with nothing | Not shown. No guessing |

**Honest limits:** body measurements entered at home can be a few centimetres off, and fabric and cut change how a garment feels. Fit Check says "likely", never "guaranteed". Measurements are personal data: stored in the account, never shared, deletable at any time.

Fit Check is plain arithmetic on our own server. It costs nothing to run.

---

## 6. AI cost plan

Cost was the main open question in the first plan. The approach: **one try-on interface in the code, several providers behind it**, chosen with an environment setting. Trendybass can start on a paid API and move to a self-hosted model without changing the rest of the app. This is the same pattern as the `AI_PROVIDER` switch in Stipwire.

### 6.1 Options compared (checked November 2026)

| Option | Cost per try-on | Commercial use | Notes |
|---|---|---|---|
| [FASHN API](https://fashn.ai/blog/pricing-update-for-developer-api) v1.6 | $0.075 | Yes | Strong quality benchmark. "Max" tier costs 4 credits ($0.30). Failed requests are reportedly not charged |
| [Kling Kolors try-on via fal](https://fal.ai/explore/virtual-try-on-apis) | about $0.07 | Yes, per fal terms | Pay per use, no monthly fee |
| [Google Virtual Try-On via fal](https://fal.ai/models/google/virtual-try-on) | $0.075 | Yes | Google's own model is listed by trackers for deprecation on 15 March 2027. Avoid as the main provider |
| **Self-hosted [FASHN VTON v1.5](https://github.com/fashn-AI/fashn-vton-1.5)** on a serverless GPU | **estimate below $0.01** | Code Apache-2.0. **Check the human-parser licence** | 972M parameters, about 2 GB of weights, runs on consumer GPUs. Pay only while a job runs |
| CatVTON, IDM-VTON, OOTDiffusion, FitDiT | — | **No** (CC BY-NC-SA) | Non-commercial licence. Cannot be used for Trendybass |

Licence status of open models comes from the [open try-on model licence list](https://github.com/XQ0820/open-virtual-try-on-models) (checked 19 October 2026). Each licence is checked again in the repository itself before use.

**How the self-hosted estimate is made:** serverless GPUs with 16 to 24 GB cost roughly $0.58 to $1.15 per hour on [RunPod](https://www.runpod.io/serverless-gpu) (sources disagree after a July 2026 price change). At 10 to 20 seconds per image that is $0.002 to $0.006 per try-on, plus cold starts. **This is a guess until the try-on spike measures real times.**

### 6.2 What it means per month

| Try-ons per month | Paid API ($0.075) | Self-hosted (about $0.005, plus idle and cold starts) |
|---|---|---|
| 1,000 | $75 | about $5 to $15 |
| 10,000 | $750 | about $50 to $100 |
| 50,000 | $3,750 | about $250 to $400 |

**Are the open models free?** The model itself is free: the code and weights can be downloaded and used commercially (Apache-2.0, after the licence check). Running it is not free: it needs a GPU, and a GPU costs money per second. On our own computer with a suitable graphics card it is free for development and testing, but not for a public website that must answer at any time.

### 6.3 Plan

1. **Spike (Sprint 0):** run 30 test cases (our own and consenting test photos, 10 garments) through FASHN API, Kling via fal and self-hosted FASHN VTON v1.5. Score garment detail, identity, artefacts and time. Check every licence, including the human parser.
2. **Beta:** use a paid API. Quality is known and there is nothing to operate.
3. **Switch to self-hosted** when monthly API cost passes about $150, or earlier if the self-hosted quality is close enough in the spike.
4. Keep the paid API as fallback when the GPU provider is down.

### 6.4 Limits that keep costs under control

- **Account required** for try-on. No guest try-ons.
- **Free allowance:** for example 5 try-ons per day per account (setting in admin).
- **Cache:** the same photo plus the same garment and colour never runs twice.
- **Check before spending:** photo quality check (cheap, runs on our server) before a paid job.
- **Daily budget cap:** when the day's AI budget is used, try-on pauses and shows a friendly message.
- **Queue** with a limited number of parallel jobs, so a spike in traffic cannot create a spike in cost.
- **Kill switch** in admin per provider and for the whole feature.
- Every job records provider, time, cost and result, so admin can see cost per day and per try-on.

### 6.5 Other AI, nearly free

| Task | Approach | Cost |
|---|---|---|
| Similar items, visual search | [Marqo-FashionSigLIP](https://huggingface.co/Marqo/marqo-fashionSigLIP) image embeddings (Apache-2.0, about 200M parameters) stored in PostgreSQL pgvector | Free. Runs on CPU when products are imported |
| Clean up feed data (colour, fit, occasion, material) | Rules first. Where rules fail, a small model in batch mode: Claude Haiku 5.5 is $0.10 in / $0.50 out per million tokens, half price in batch | A few dollars per 10,000 products |
| Photo check before try-on | Small pose and person detection model on the server | Free |

No AI chat assistant in the MVP. It costs money per message and does not prove the core idea.

---

## 7. Recommendations and Complete the Look

Start simple and measurable:

1. **Similar items:** nearest products by image embedding, same category, in stock.
2. **Complete the Look:** rules per category (dress → shoes, bag, jacket), then the closest match in colour and style by embedding, within a similar price range.
3. **Recently viewed** and **Trending in this category** from our own click data.

Personal recommendations based on history come later, with consent, when there is enough data.

---

## 8. Customer accounts

- Sign up with email and password, email check
- Orders, tracking and returns
- Addresses
- Saved items (wishlist) with price-drop email, opt-in
- Measurements and preferred fit for Fit Check
- Try-on history: results the shopper chose to keep
- Saved photos: optional, deletable at any time, deleted automatically after a set period of no use
- Download my data, delete my account (GDPR). Order records are kept as long as accounting law requires, without the account

---

## 9. Admin

For one non-technical business administrator and one technical admin.

**MVP**

- **Overview:** revenue, orders to ship, low stock, returns, clicks out, commission, sign-ups, try-ons, AI cost per day
- **Products (own):** create and edit, photos, sizes and colours with their own SKU, price and cost, garment measurements per size, publish or hide
- **Stock:** quantity per SKU, reserved, low-stock alert, manual changes with a reason (all logged)
- **Orders:** search, payment status from Stripe, mark shipped with tracking, cancel, returns, refunds through Stripe
- **Discount codes:** amount or percentage, dates, minimum order
- **Feeds (affiliate):** add a network feed, map its fields, run and check imports, see errors
- **Partner products:** hide, feature, edit category and labels, switch try-on on or off per product or shop
- **Categories and collections:** create, order, show or hide
- **Homepage and banners**
- **Shops (affiliate partners):** network, commission rate, countries, try-on allowed yes or no
- **AI:** providers, daily budget, free allowance, kill switch, error rate. No access to shoppers' photos.
- **Roles:** Super admin, Business admin. Every change is logged.

Prices on past orders never change when a product price changes. Payment card data and passwords are never visible in the admin.

**Later:** suppliers and purchase orders, warehouse integration, advanced reports.

---

## 10. Technology

Same base as Kotly, so code patterns, CI and security setup can be reused.

| Area | Choice | Why |
|---|---|---|
| Front end | Nuxt 4, Vue 3, TypeScript strict, in `apps/web/` | Server rendering for SEO. No database or business logic |
| Back end | Express 5, Zod, Drizzle, in `apps/api/` | Same split as Kotly ADR 0003. The API can serve a mobile app later |
| Try-on worker | Python worker in `apps/tryon-worker/`, packaged as a container for a serverless GPU | Open try-on models are Python. Kept apart from the Node app |
| Styling | Tailwind CSS 4, Nuxt UI | Fast, accessible components |
| SEO | @nuxtjs/seo, nuxt-security, @nuxt/image | Sitemaps, schema.org, security headers, image sizes |
| Database | PostgreSQL 17 + pgvector | Products, embeddings for similar items |
| Cache and queue | Valkey + BullMQ | Feed imports, try-on jobs, emails, rate limits |
| Authentication | Custom session auth (copied from Kotly) | No JWT, sessions can be revoked instantly |
| Payments | Stripe Checkout and webhooks | Hosted payment page keeps card data off our servers |
| Images | sharp, S3-compatible storage in the EU | Product images resized. Shoppers' photos in a private bucket |
| AI | `TryOnProvider` interface: `fashn-api`, `fal`, `self-hosted` | Switch provider with one setting |
| Email | Resend (EU) | Same as Kotly |
| Analytics | Umami or Plausible, self-hosted | No tracking cookies |
| Errors | GlitchTip, self-hosted | |
| Tests | Vitest, Supertest, Playwright | Unit, API and real browser tests |
| CI and security | GitHub Actions, Semgrep, gitleaks, npm audit, Dependabot | Same gate as Kotly |
| Package manager | npm workspaces, install scripts blocked, exact versions | Supply-chain protection |
| Hosting | Docker on an EU VPS, Caddy. GPU jobs on a serverless GPU provider | Cheap. Only the GPU part scales with use |

Each package is added in the sprint that first uses it, not before (fewer packages, smaller attack surface). [docs/architecture/stack.md](docs/architecture/stack.md) lists what is installed now and what comes when.

### 10.1 Repository structure

```
trendybass/
├── apps/
│   ├── web/               Nuxt front end: pages, components, texts, SEO. No database, no secrets
│   └── api/               Express back end: modules/, db/ (schema, migrations), shared/
├── workers/tryon/         Python try-on model server (self-hosted provider, added in M6)
├── docs/                  SSDLC documents: decisions, requirements, threat model, privacy, release
├── infra/postgres/        Local database first-run setup
├── scripts/               Developer scripts (npm run dev)
├── .github/               CI gate, Dependabot, PR template, branch rules
└── docker-compose.yml     Local Postgres (pgvector), Valkey, Mailpit
```

### 10.2 Getting started

Needs Node 24.15+, npm 11 and Docker Desktop.

```sh
cp .env.example .env        # then fill in POSTGRES_PASSWORD
npm install
npm run prepare:web         # Nuxt type files (install scripts are blocked on purpose)
npm run dev                 # database, API on :4001, website on :3001
```

Local ports are chosen so Trendybass and Kotly can run at the same time: website 3001, API 4001, Postgres 5436, Valkey 6381, Mailpit 8026.

Checks before every commit: `npm run lint`, `npm run typecheck`, `npm test`.

---

## 11. Design system

### 11.1 What the research says

- **Product photos carry the colour.** One analysis of top fashion brands found 94% of product photos use a plain background, most of them white or near-white. Marketplaces such as Zalando and Amazon require it. The site around the photos should stay neutral so it does not fight with the products or change how their colours look.
- **No colour "sells" by itself.** Studies on website colour and trust show small, indirect effects that depend on context. One study found colour affected purchase intention only through trust, with no direct effect of blue or red ([Taylor & Francis, 2021](https://www.tandfonline.com/doi/full/10.1080/19409419.2021.1951066)). "Red buttons convert better" claims come from single A/B tests where the button simply stood out more.
- **Contrast is what makes a button work.** The main button must be the strongest contrast on the page and pass WCAG AA.
- **Serif or sans does not change reading speed on screen** in most studies. Fonts with low stroke contrast perform better at small sizes ([Minakata & Beier, 2022](https://adk.elsevierpure.com/files/66012108/2022MinakataBeierStrokeSerifNormalVision.pdf)). High-contrast serifs (the "fashion magazine" look) are fine for large headings, not for small text.

### 11.2 Colours

Neutral base, black main button, one brand accent used sparingly. Contrast ratios were calculated with the WCAG formula.

| Token | Hex | Use | Contrast on paper `#FAFAF7` |
|---|---|---|---|
| `ink` | `#141414` | Text, main button | 17.6 : 1 |
| `paper` | `#FAFAF7` | Page background | — |
| `white` | `#FFFFFF` | Cards, inputs | — |
| `image` | `#F2F1EE` | Behind product photos | — |
| `muted` | `#5C5B57` | Secondary text | 6.5 : 1 |
| `accent` | `#3B2FC9` | Try-on button and badge, links, brand moments | 8.2 : 1 |
| `sale` | `#B42318` | Sale prices only | 6.3 : 1 |
| `success` | `#1E7A4C` | Confirmations | 5.1 : 1 |
| `line` | `#D6D3CC` | Dividers only. Input borders use a darker grey to reach 3 : 1 | 1.4 : 1 |

The accent colour belongs to Try-On. When a shopper sees it, it means "AI feature". Sale red is never used for anything but prices. A dark mode comes later.

### 11.3 Fonts

| Role | Font | Why |
|---|---|---|
| Headings and campaign text | **Fraunces** (variable, SIL Open Font License) | A fashion-editorial serif with an optical-size axis: it lowers its stroke contrast at smaller sizes, which matches the readability research |
| Everything else (UI, body, prices) | **Inter** (variable, SIL Open Font License) | Low stroke contrast, large x-height, tabular numbers so prices line up, wide language support for later markets |

- Self-hosted fonts, no Google Fonts at runtime. A German court (LG München I, January 2022) ruled that loading Google Fonts from Google's servers shared visitors' IP addresses without consent.
- Body text at least 16 px. Headings in Fraunces only from 24 px.
- Two families only, to keep pages fast.

Kotly uses DM Sans and green. Trendybass is kept visually separate on purpose.

---

## 12. SEO

SEO and social are the main free growth channels.

- Server rendering for every public page, fast Core Web Vitals (LCP under 2.5 s, INP under 200 ms, CLS under 0.1)
- schema.org `Product` with `Offer` (price, currency, availability, seller) on product pages
- Category and collection pages with unique intro text, not only product grids
- Guides ("what to wear to a summer wedding") that link to products
- Products that leave a feed: page stays with "no longer available" and similar items, no soft 404
- Thin filter combinations are noindex
- Outbound shop links use `rel="sponsored nofollow"`
- Sitemaps split by type. Search Console and Bing Webmaster Tools from week one
- Language URLs (`/en/`, `/nl/`, ...) prepared from the start, even with English only

---

## 13. Security and privacy

### 13.1 SSDLC

Every feature goes through six phases, each with a document and a gate: requirements and abuse cases, design and threat model, build, verify, release, operate. The process, gates and definition of done are in [docs/ssdlc.md](docs/ssdlc.md). Baseline: OWASP ASVS Level 2, OWASP Top 10, OWASP API Security Top 10, PCI DSS SAQ A for payments, GDPR.

### 13.2 Payments

- Stripe Checkout only. No card fields on our pages
- Orders are paid only when Stripe's signed webhook says so. Webhooks are verified, processed once (idempotent) and logged
- Prices and totals are always calculated on the server, never taken from the browser
- Stock is reserved in one database transaction, so the last item cannot be sold twice

### 13.3 Shoppers' photos

Photos of people are personal data under GDPR. They are handled with the most care of anything in the system.

- Processing starts only after the shopper taps a clear confirm button
- Stored in a private bucket, encrypted, never public URLs (short-lived signed links only)
- Original photo deleted after the try-on unless the shopper chooses **Save photo**
- Saved photos deleted after a set period of no use, and at once when the account is deleted
- Admins cannot browse shoppers' photos
- Never used to train models. Any outside AI provider must have a contract (DPA) that says the same, and EU processing or approved transfer safeguards
- A Data Protection Impact Assessment (DPIA) is written before the public try-on launch
- Under-16s cannot use try-on

### 13.4 AI labelling

Every try-on result shows a visible "AI-generated preview" label and carries a machine-readable marker in the file (C2PA or IPTC metadata). The EU AI Act's transparency rules for AI-generated images (Article 50) apply from August 2026.

### 13.5 Abuse

Try-on could be misused with photos of other people. Mitigations: account required, upload terms ("only photos of yourself"), daily limits, rejection of photos with more than one person, report button on results, garments limited to the catalogue (no free garment upload).

---

## 14. Roadmap

Two-week sprints. Dates are set when Sprint 0 starts, after the Kotly MVP launch (planned for 15 December 2026).

| Milestone | Sprints | Goal | Done when |
|---|---|---|---|
| **M0 Foundation** | Sprint 0 | Repo, CI, SSDLC docs, local setup, try-on spike | MR-01 merged with CI green; spike report with a provider decision |
| **M1 Catalogue** | Sprints 1–2 | Own products and categories, product list and product pages, SEO | Admin can create a product with sizes, stock and measurements; pages indexed |
| **M2 Accounts** | Sprint 3 | Sign-up, sign-in, saved items, measurements, addresses | Session auth from Kotly, GDPR export and delete |
| **M3 Checkout** | Sprints 4–5 | Bag, Stripe Checkout, orders, stock reservation, emails, returns, refunds | A real test order goes from bag to refund; legal texts live |
| **M4 Affiliate** | Sprint 6 | First network feed imported daily, partner products with click-out | Feed import runs daily, click-outs tracked |
| **M5 Fit Check and Try-On beta** | Sprints 7–8 | Fit Check on every own product; try-on for signed-in shoppers | Queue, limits, budget cap, labelling, deletion, DPIA done. 50 beta users |
| **M6 Complete the Look and self-hosted try-on** | Sprints 9–10 | Recommendations, lower AI cost | Similar items on every product; self-hosted provider live with API fallback |
| **Later** | | | Languages, outfits, own label, B2B widget, as data shows the need |

Public launch can happen after M3 (a working shop) or after M5 (with the signature features). Decided at the end of M3.

---

## 15. How we work

- **Two-week sprints**, each with a goal, a short plan at the start and a demo at the end
- **Merge requests are numbered** (MR-01, MR-02, ...). One branch per MR, named `mr-NN-short-name`
- **Small commits** after each verified change. Push and open the MR when the work is done
- **Before each commit:** typecheck, lint and tests pass
- **Definition of done:** works at 360 px and 1280 px, loading, empty and error states, accessible (WCAG 2.1 AA), SEO checklist for public pages, tests for API changes
- **Decisions** that are hard to undo get a short ADR in `docs/decisions/`

---

## 16. Principles

- Start with a small range we know well, then grow
- Two signature features done well beat ten done badly
- Every AI call has a known cost, a limit and a fallback
- Shoppers' photos are treated as the most sensitive data we hold
- Honest labels: AI preview, sponsored, price may differ
- Plain, simple English in the product and the docs

---

**Trendybass. Fashion that fits your style.**
