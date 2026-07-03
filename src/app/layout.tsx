import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import ClientShell from "@/components/ClientShell";
import { ScrollProvider } from "@/components/ScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';var isLight=t==='light';document.documentElement.classList.toggle('light',isLight);document.documentElement.style.backgroundColor=isLight?'#f4f5f3':'#0a0f0c';})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ScrollProvider>
            <ClientShell>
              <Navbar />
              <main className="relative z-10 min-h-screen pt-[60px]">
                {children}
              </main>
              <ScrollToTop />
            </ClientShell>
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
