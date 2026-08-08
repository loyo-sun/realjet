export default {
  layout: "layouts/base.njk",
  pageType: "product-inquiry",
  robots: "noindex, follow",
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    title: (data) => `Enquire About ${data.product.data.title} | Realjet`,
    seoTitle: (data) => `Enquire About ${data.product.data.title} | Realjet`,
    description: (data) =>
      `Send Realjet your requirements for ${data.product.data.title}.`,
    canonical: (data) =>
      `https://realjetech.com/inquiry/${data.product.data.slug}.html`,
    socialImage: (data) =>
      new URL(data.product.data.image, data.site.url).toString(),
  },
};
