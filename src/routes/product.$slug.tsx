import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Droplets, Heart, PawPrint, Sun } from "lucide-react";
import { getProductBySlugFn } from "@/server/products";
import { getCategoriesFn } from "@/server/categories";
import { getCategory } from "@/data/category-helpers";
import { PlantArt } from "@/components/plant-art";
import { StarRating } from "@/components/star-rating";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { formatPrice } from "@/lib/format";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    const [{ product, related }, categories] = await Promise.all([
      getProductBySlugFn({ data: { slug: params.slug } }),
      getCategoriesFn(),
    ]);
    if (!product) throw notFound();
    return { product, related, category: getCategory(categories, product.category) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { product } = loaderData;
    const canonical = `${SITE_URL}/product/${product.slug}`;
    const title = `${product.name} | Zachs, Lurgan`;
    return {
      meta: [
        { title },
        { name: "description", content: product.shortDescription },
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: product.shortDescription },
        { property: "og:url", content: canonical },
        { property: "product:price:amount", content: String(product.price) },
        { property: "product:price:currency", content: "GBP" },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related, category } = Route.useLoaderData();
  const canonicalUrl = `${SITE_URL}/product/${product.slug}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE_NAME },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "GBP",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      areaServed: "GB-NIR",
      seller: { "@type": "Organization", name: BUSINESS.legalName },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Shop", item: `${SITE_URL}/shop` },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `${SITE_URL}/shop?category=${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="container-page py-10">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav className="mb-6 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-brand-700">
          Shop
        </Link>
        {category && (
          <>
            {" / "}
            <Link
              to="/shop"
              search={{ category: category.slug }}
              className="hover:text-brand-700"
            >
              {category.name}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <PlantArt
          icon={product.art.icon}
          from={product.art.from}
          to={product.art.to}
          className="aspect-square w-full rounded-3xl"
          iconClassName="h-32 w-32"
        />

        <div>
          {product.tags && product.tags.length > 0 && (
            <div className="mb-3 flex gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium capitalize text-brand-800"
                >
                  {tag.replace("-", " ")}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-3xl text-brand-950 sm:text-4xl">
            {product.name}
          </h1>
          {product.latinName && (
            <p className="mt-1 text-sm italic text-muted">{product.latinName}</p>
          )}

          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={16} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-2xl text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-foreground/85">
            {product.description}
          </p>

          {product.care && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <CareStat icon={Sun} label="Light" value={product.care.light} />
              <CareStat icon={Droplets} label="Water" value={product.care.water} />
              <CareStat icon={Heart} label="Difficulty" value={product.care.difficulty} />
              <CareStat
                icon={PawPrint}
                label="Pet friendly"
                value={product.care.petFriendly ? "Yes" : "No"}
              />
            </div>
          )}

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>

          <p className="mt-4 text-xs text-muted">
            {product.stock > 10
              ? "In stock, ready to ship within 2 working days."
              : product.stock > 0
                ? `Only ${product.stock} left in stock.`
                : "Currently out of stock."}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="You might also like" title="Complete the look" />
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CareStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sun;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-3">
      <Icon size={16} className="text-brand-600" />
      <p className="mt-2 text-xs text-muted">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
