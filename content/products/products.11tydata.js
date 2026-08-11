const isProduction = process.env.ELEVENTY_ENV === "production";

export default {
  layout: "layouts/product.njk",
  pageType: "product",
  eleventyComputed: {
    sitemap: (data) => data.productSeries !== "precast-concrete-moulds",
    permalink: (data) =>
      data.draft && isProduction
        ? false
        : data.productSeries === "precast-concrete-moulds"
          ? `/precast-concrete-molds/${data.slug}/index.html`
          : `/products/${data.slug}.html`,
    canonical: (data) =>
      data.productSeries === "precast-concrete-moulds"
        ? `https://realjetech.com/precast-concrete-molds/${data.slug}/`
        : `https://realjetech.com/products/${data.slug}.html`,
    seoTitle: (data) => `${data.title} | Realjet Products`,
    socialImage: (data) => new URL(data.image, data.site.url).toString(),
    robots: (data) => data.draft ? "noindex, nofollow" : "index, follow",
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
  },
};
