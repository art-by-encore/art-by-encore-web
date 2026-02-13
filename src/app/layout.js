import "./globals.css";
import { fonts } from "@/fonts/fonts";
import { SmoothLayout, Header, Footer, LenisSmoothScroll, FloatingButton } from "@/components/layout";
import { ViewTransitions } from "next-view-transitions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { LoaderProvider } from "./hooks/LoaderContext";
import { seo } from '@/utils/data';
const { homeSEO } = seo;

export const metadata = {
  title: homeSEO?.title,
  description: homeSEO?.description,
  keywords: homeSEO?.keywords,
  robots: homeSEO?.metaRobots,
  viewport: homeSEO?.metaViewport,
  alternates: {
    canonical: homeSEO?.canonicalURL,
  },
  openGraph: homeSEO?.openGraph,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  author: 'Art By Encore',
  publisher: 'Art By Encore',
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body
          className={`${fonts} antialiased`}
        >
          {/* Google Analytics */}
          <GoogleAnalytics gaId={'G-0HNEQ79ER8'} />

          {/* Google Tag Manager */}
          <GoogleTagManager gtmId={'GTM-NDTL23C7'} />
          <LoaderProvider>
            <SmoothLayout>
              <Header />
              {children}
              <FloatingButton />
              <Footer />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </SmoothLayout>
          </LoaderProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
