const isProduction = process.env.ELEVENTY_ENV === "production";

export default {
  layout: "layouts/product.njk",
  pageType: "product",
  sitemap: true,
  eleventyComputed: {
    permalink: (data) =>
      data.draft && isProduction ? false : `/products/${data.slug}.html`,
    canonical: (data) => `https://realjetech.com/products/${data.slug}.html`,
    seoTitle: (data) => data.seoTitle || `${data.title} | Realjet Products`,
    socialImage: (data) => new URL(data.image, data.site.url).toString(),
    robots: (data) => data.draft ? "noindex, nofollow" : "index, follow",
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
  },
};
