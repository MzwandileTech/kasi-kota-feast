import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send, CheckCircle } from "lucide-react";

// --- Social Icons (Updated) ---

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.9 123.3 464H48L202.7 272.9 33.1 48H184.9L286.9 184.7 389.2 48zM364.4 425.6h50.9L148.9 88h-50.8l266.3 337.6z" />
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,140.25a210.32,210.32,0,0,0,147.53,69.66Z" />
  </svg>
);

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
  >
    {children}
  </a>
);

// --- Newsletter Component ---
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(`Subscribing with email: ${email}`);

    setToastMessage("Subscription successful! Welcome to the Kasi Kota family.");

    setEmail("");

    setTimeout(() => {
      setToastMessage("");
    }, 5000);
  };

  return (
    <div className="space-y-4 p-6 rounded-2xl bg-primary/10 dark:bg-primary/20 shadow-md">
      <h4 className="text-xl font-bold text-foreground">Stay Updated</h4>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Subscribe for exclusive specials and 10% off your first order.
      </p>

      {toastMessage && (
        <div className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-md border border-green-200 dark:bg-green-800/50 dark:text-green-200">
          <CheckCircle className="h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mt-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Enter your email for the newsletter"
          className="flex-grow p-3 text-sm border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-zinc-800 dark:text-white"
          required
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Subscribe
        </button>
      </form>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gray-50 dark:bg-zinc-900 border-t border-muted/30"
    >
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Top Row */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-6">
            <h3
              className="text-3xl font-extrabold tracking-tight"
              role="heading"
              aria-level={3}
            >
              <span className="text-primary">Kasi</span>
              <span className="text-foreground"> Kota</span>
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Authentic township flavors crafted with passion. Serving the
              community since 2020.
            </p>
          </div>

          {/* Contact & Hours (WITH NEW ID="contact") */}
          <div id="contact" className="space-y-6">
            <h4
              className="text-lg font-bold text-foreground"
              role="heading"
              aria-level={4}
            >
              Contact & Visit
            </h4>
            <address className="not-italic space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <a
                href="tel:+27111234567"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                +27 (0)11 123 4567
              </a>
              <a
                href="mailto:orders@kasikota.co.za"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                orders@kasikota.co.za
              </a>
              <div className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 mt-0.5 text-primary"
                  aria-hidden="true"
                />
                <span>123 Main Road, Soweto, Johannesburg, South Africa</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  className="h-4 w-4 mt-0.5 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p>Mon - Fri: 9am - 9pm</p>
                  <p>Sat - Sun: 11am - 7pm</p>
                </div>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <Newsletter />
        </div>

        {/* Bottom Row */}
        <div className="border-t border-muted/30 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {new Date().getFullYear()} Kasi Kota. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a
                href="https://mzwandile-sibiya.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                MzwandileTech
              </a>
            </p>
          </div>

          <div className="flex gap-4">
            <SocialIcon href="https://facebook.com" label="Follow us on Facebook">
              <Facebook className="h-6 w-6" />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Follow us on Instagram">
              <Instagram className="h-6 w-6" />
            </SocialIcon>
            <SocialIcon href="https://x.com" label="Follow us on X (formerly Twitter)">
              <XIcon className="h-6 w-6" />
            </SocialIcon>
            <SocialIcon href="https://tiktok.com" label="Follow us on TikTok">
              <TikTokIcon className="h-6 w-6" />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" label="Follow us on YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 576 512"
              >
                <path d="M549.655 124.083C538.87 86.613 502.5 58 464.37 58H111.63C73.5 58 37.13 86.613 26.345 124.083 0 217.5 0 256 0 256s0 38.5 26.345 131.917C37.13 425.387 73.5 454 111.63 454h352.74c38.13 0 74.5-28.613 85.285-66.083C576 294.5 576 256 576 256s0-38.5-26.345-131.917zM232 336V176l142 80-142 80z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};
