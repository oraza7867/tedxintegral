import type { Metadata } from "next";
import "../styles/global.css";
import ClientLayout from "./client-layout";
import { SITE_SETTINGS } from "../data/siteSettings";

export const metadata: Metadata = {
  title: SITE_SETTINGS.meta.title,
  description: SITE_SETTINGS.meta.description,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
