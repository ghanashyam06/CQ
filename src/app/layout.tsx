import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Force dark background before first paint so preloader never flashes light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.style.backgroundColor='#060608';document.addEventListener('DOMContentLoaded',function(){document.body.style.backgroundColor='#060608'})})()`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
        data-preloading="true"
        style={{ backgroundColor: '#060608' }}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientShell>
            <Navbar />
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
            <ScrollToTop />
          </ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
