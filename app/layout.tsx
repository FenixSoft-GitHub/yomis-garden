import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yomi's Garden — Vivero venezolano",
    template: "%s | Yomi's Garden",
  },
  description:
    "Plantas seleccionadas con amor, árboles frutales, cactus, suculentas y todo lo que necesitas para tu jardín. Envíos a toda Venezuela.",
  keywords: [
    "vivero",
    "plantas",
    "cactus",
    "suculentas",
    "árboles frutales",
    "macetas",
    "jardinería",
    "Venezuela",
    "paisajismo",
  ],
  authors: [{ name: "Yomi's Garden" }],
  openGraph: {
    title: "Yomi's Garden",
    description: "Vivero venezolano",
    type: "website",
    locale: "es_VE",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
