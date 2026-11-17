import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "House of Aathvya | The Art of Everyday Elegance",
    template: "%s | House of Aathvya"
  },
  description: "Discover thoughtfully chosen jewellery and timeless expressions of everyday elegance at House of Aathvya."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
