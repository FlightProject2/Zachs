import {
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { NotFound } from "@/components/not-found";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Zachs | Plant Nursery & Online Garden Shop",
      },
      {
        name: "description",
        content:
          "Zachs is a UK plant nursery delivering healthy houseplants, outdoor plants, succulents, pots and plant care essentials straight to your door.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Scripts />
      </body>
    </html>
  );
}
