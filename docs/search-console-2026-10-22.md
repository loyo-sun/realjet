# Search Console indexing audit — 22 October 2026

Property: `sc-domain:realjetech.com`. Report last updated 16 October 2026: 233 indexed URLs and 58 excluded URLs.

## Technical correction

Netlify served both `/products/custom-mounting-bracket` and `/products/custom-mounting-bracket.html` with HTTP 200 and identical content. The HTML canonical and sitemap use the `.html` URL. Extensionless aliases occur in both the crawled-not-indexed and alternate-canonical reports.

Generate explicit forced HTTP 301 rules from published product URLs for the extensionless and trailing-slash aliases. The destination remains the existing `.html` canonical. Rules cover actual published products only, preserving catalogue, category, equipment-directory and marketing routes. Drafts receive no rules. No content or layout changes are included.

## Report disposition

| Category | URLs | Finding |
| --- | ---: | --- |
| Page with redirect | 5 | HTTP/www home variants and two retired mould routes intentionally redirect. These source URLs should remain excluded. |
| Crawled, currently not indexed | 13 | Three extensionless product aliases are consolidated by this change. Remaining examples include canonical product pages, catalogue page 4, Spanish beam and Indonesian spun-pile pages, and the RSS feed. Exclusion alone does not establish a technical error or guarantee future indexing. |
| Alternate page with proper canonical | 9 | Eight extensionless product aliases are consolidated. The contact query parameter URL appropriately canonicalizes to `/contact/`. |
| Excluded by noindex | 1 | Historical `/manufacturing/` example last crawled 3 August; live verification on 22 October returned HTTP 301 to `/marketing/contract_manufacturing/`. Existing validation is in progress. |
| Discovered, currently not indexed | 30 | Awaiting Google crawl; examples include 7 insight pages, Russian beam page, Arabic privacy page and 21 product pages. Existing validation is in progress. |

Live sitemap contains 410 unique URLs. Canonical product and Indonesian landing-page samples return HTTP 200. Existing HTTP/www redirects and contact canonicalization are retained.

## Verification and follow-up

Run `npm run build`, `node scripts/validate-indexing.mjs`, and the existing catalogue/site validators on the isolated commit. After deployment, verify aliases return one HTTP 301 to an indexable HTTP 200 canonical, then inspect representative canonical URLs in Search Console. Google must recrawl before report counts change; intentional aliases and redirects are not expected to become indexed. Sitemap submission is a discovery hint, not an indexing guarantee.

References: [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
