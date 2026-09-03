import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Zachs" },
      { name: "description", content: "Get in touch with the Zachs plant nursery team." },
    ],
  }),
  component: ContactPage,
});

const DETAILS = [
  { icon: Mail, label: "Email", value: "hello@zachs.co.uk" },
  { icon: Phone, label: "Phone", value: "01622 000 000" },
  { icon: MapPin, label: "Nursery", value: "Maidstone, Kent, UK" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–5pm" },
];

function ContactPage() {
  return (
    <div className="container-page py-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-600">
            Get in touch
          </p>
          <h1 className="font-display text-4xl text-brand-950">We&apos;d love to help.</h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/85">
            Question about an order, a wilting leaf, or just want plant advice?
            Send us a message and our team will get back to you within one
            working day.
          </p>

          <div className="mt-8 space-y-4">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <d.icon size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">{d.label}</p>
                  <p className="text-sm font-medium text-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
