import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { NotFound } from "@/components/not-found";
import { JsonLd } from "@/components/json-ld";
import { getCategoriesFn } from "@/server/categories";
import { BUSINESS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  loader: async () => {
    const categories = await getCategoriesFn();
    return { categories };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "GB-NIR" },
      { name: "geo.placename", content: "Lurgan" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GardenStore",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.legalName,
  url: SITE_URL,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  priceRange: "££",
  currenciesAccepted: "GBP",
  paymentAccepted: "Credit Card, Debit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  areaServed: [
    ...BUSINESS.areaServed
      .filter((name) => name !== "Northern Ireland")
      .map((name) => ({ "@type": "City", name })),
    { "@type": "State", name: "Northern Ireland" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "17:00",
  },
};

function RootDocument({ children }: { children: React.ReactNode }) {
  const { categories } = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={localBusinessJsonLd} />
        <CartProvider>
          {isAdmin ? (
            <main className="flex-1">{children}</main>
          ) : (
            <>
              <Header categories={categories} />
              <main className="flex-1">{children}</main>
              <Footer categories={categories} />
              <CartDrawer />
            </>
          )}
        </CartProvider>
        <Scripts />
      </body>
    </html>
  );
}
