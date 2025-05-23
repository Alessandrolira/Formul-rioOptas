import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: "500"
});

export const metadata: Metadata = {
  title: "Forms Optas",
  description: "Formulário Optas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
