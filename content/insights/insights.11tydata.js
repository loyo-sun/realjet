const isProduction = process.env.ELEVENTY_ENV === "production";

export default {
  layout: "layouts/insight.njk",
  pageType: "insight",
  sitemap: true,
  eleventyComputed: {
    permalink: (data) =>
      data.draft && isProduction ? false : `/insights/${data.slug}/index.html`,
    canonical: (data) => `https://realjetech.com/insights/${data.slug}/`,
    seoTitle: (data) => `${data.title} | Realjet Insights`,
    socialImage: (data) => new URL(data.image, data.site.url).toString(),
    robots: (data) => data.draft ? "noindex, nofollow" : "index, follow",
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
  },
};
