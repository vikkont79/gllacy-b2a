import type { Metadata } from "next";
import { inter } from "@/shared/lib/fonts";
import { Layout } from "@/widgets/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gllacy Shop",
  description: "Магазин мороженого Глейси",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
