export const cataloguePageSize = 12;

export const productCategories = [
  { series: "precast-concrete-moulds", slug: "precast-concrete-moulds", name: "Precast Concrete Moulds", description: "Steel moulds and formwork for bridge, building, tunnel, municipal and marine concrete components. Browse by product or explore our mould application guide." },
  { series: "precast-production-equipment", slug: "precast-beam-production-equipment", name: "Precast Beam Production Equipment", description: "Project-specific beam formwork, hydraulic operating systems, mould transfer equipment and station-based production systems." },
  { series: "spun-pile-equipment", slug: "spun-pile-production-equipment", name: "Spun Pile Production Equipment", description: "Equipment for reinforcement preparation, concrete batching, moulding, tensioning, spinning, curing and material transfer in spun pile plants." },
  { series: "contract-manufacturing", slug: "custom-machinery-components", name: "Custom Machinery Components", description: "Drawing-based sheet metal chassis, welded structures, machinery frames, tanks and component assemblies for equipment manufacturers." },
];

export function catalogueProducts(items) {
  return items
    .filter((item) => !item.data.draft && item.data.mouldGroup !== true)
    .sort((a, b) => Number(a.data.order ?? 999) - Number(b.data.order ?? 999) || a.data.title.localeCompare(b.data.title, "en"));
}

export function buildCataloguePages(items) {
  const products = catalogueProducts(items);
  for (const product of products) {
    if (!productCategories.some((category) => category.series === product.data.productSeries)) {
      throw new Error(`Product category is missing for ${product.data.slug}`);
    }
  }
  const navigation = [
    { slug: "all", name: "All Products", url: "/products/", count: products.length },
    ...productCategories.map((category) => ({ ...category, url: `/products/${category.slug}/`, count: products.filter((product) => product.data.productSeries === category.series).length })),
  ];
  return navigation.flatMap((category) => {
    const selected = category.slug === "all" ? products : products.filter((product) => product.data.productSeries === category.series);
    const totalPages = Math.max(1, Math.ceil(selected.length / cataloguePageSize));
    const pageLinks = Array.from({ length: totalPages }, (_, index) => ({ number: index + 1, url: index === 0 ? category.url : `${category.url}page/${index + 1}/` }));
    return pageLinks.map((link, index) => ({
      ...link, category, navigation, pageLinks,
      total: selected.length, totalPages,
      start: selected.length ? index * cataloguePageSize + 1 : 0,
      end: Math.min((index + 1) * cataloguePageSize, selected.length),
      previousUrl: pageLinks[index - 1]?.url,
      nextUrl: pageLinks[index + 1]?.url,
      products: selected.slice(index * cataloguePageSize, (index + 1) * cataloguePageSize),
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Products", url: "/products/" },
        ...(category.slug === "all" ? [] : [{ name: category.name, url: category.url }]),
        ...(index ? [{ name: `Page ${index + 1}`, url: link.url }] : []),
      ].map((entry, position) => ({ "@type": "ListItem", position: position + 1, name: entry.name, item: `https://realjetech.com${entry.url}` })),
      heading: category.slug === "all" ? "Products" : category.name,
      seoTitle: `${category.slug === "all" ? "Precast Equipment, Moulds and Machinery Components" : category.name}${index ? ` — Page ${index + 1}` : ""} | Realjet`,
      description: `${category.description || "Browse Realjet precast concrete moulds, beam production equipment, spun pile equipment and custom machinery components."}${index ? ` Page ${index + 1} of ${totalPages}.` : ""}`,
    }));
  });
}
