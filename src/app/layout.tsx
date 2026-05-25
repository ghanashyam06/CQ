import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import ClientShell from "@/components/ClientShell";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CodeQuesters | Learn. Build. Hack. Earn. Lead.",
  description:
    "India's student-first tech ecosystem helping the next generation of builders grow together.",
  icons: {
    icon: "/logo-CQ-tech.png",
    apple: "/logo-CQ-tech.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${poppins.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientShell>
            <Navbar />

            {/* z-10 so content sits above any background layers */}
            <main className="relative z-10 min-h-screen">
              {children}
            </main>

            <Footer />
            <ScrollToTop />
          </ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
