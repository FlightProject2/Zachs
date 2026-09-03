import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Droplets, Heart, PawPrint, Sun } from "lucide-react";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { PlantArt } from "@/components/plant-art";
import { StarRating } from "@/components/star-rating";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="container-page py-10">
      <nav className="mb-6 text-xs text-muted">
        <span>Shop</span>
        {category && (
          <>
            {" / "}
            <span>{category.name}</span>
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
            <ProductPurchasePanel slug={product.slug} sizes={product.sizes} />
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
