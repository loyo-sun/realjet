import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const isProduction = process.env.ELEVENTY_ENV === "production";
const toDate = (value) =>
  value instanceof Date ? value : new Date(`${value}T00:00:00Z`);

export default function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("DESIGN_TOKENS.md");
  eleventyConfig.ignores.add("content/insights/README.md");

  eleventyConfig.addPassthroughCopy({ public: "." });
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets/site" });
  eleventyConfig.addPassthroughCopy({
    "src/assets/image/realjet-logo.webp": "images/realjet-logo.webp",
    "src/assets/image/manufacturing-capability.webp":
      "images/home/manufacturing-capability.webp",
    "src/assets/image/precast-beam-factory-hero.webp":
      "images/home/precast-production-line.webp",
  });

  eleventyConfig.addCollection("publishedInsights", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./content/insights/*.md")
      .filter((item) => !item.data.draft || !isProduction)
      .sort((a, b) => toDate(b.data.date) - toDate(a.data.date)),
  );

  eleventyConfig.addFilter("readableDate", (value) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(toDate(value)),
  );
  eleventyConfig.addFilter("isoDate", (value) =>
    toDate(value).toISOString().slice(0, 10),
  );
  eleventyConfig.addFilter("absoluteUrl", (value, base) =>
    new URL(value, base).toString(),
  );
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("limit", (items, count) =>
    Array.isArray(items) ? items.slice(0, count) : [],
  );

  eleventyConfig.addShortcode(
    "responsiveImage",
    (src, alt, loading = "lazy", sizes = "100vw") => {
      if (!src) return "";
      const escapedSrc = String(src).replaceAll('"', "&quot;");
      const escapedAlt = String(alt || "").replaceAll('"', "&quot;");
      const escapedSizes = String(sizes).replaceAll('"', "&quot;");
      return `<img src="${escapedSrc}" alt="${escapedAlt}" loading="${loading}" decoding="async" sizes="${escapedSizes}">`;
    },
  );

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: { name: "publishedInsights", limit: 20 },
    metadata: {
      language: "en",
      title: "Realjet Insights",
      subtitle:
        "Engineering insights for custom machinery components and precast concrete production lines.",
      base: "https://realjetech.com/",
      author: {
        name: "Changsha Ruijie Machinery Technology Co., Ltd",
        email: "loyosun@gmail.com",
      },
    },
  });

  return {
    dir: {
      input: ".",
      includes: "site/_includes",
      data: "site/_data",
      output: ".build/eleventy",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
