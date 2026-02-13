import { Suspense, lazy } from 'react';
import { NewLoader } from "@/components/ui";
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
};
// Lazy load components
const Banner = lazy(() => import('@/components/home/Banner'));
const WhoWeAre = lazy(() => import('@/components/home/WhoWeAre'));
const WelcomeEncore = lazy(() => import('@/components/home/WelcomeEncore'));
const Portfolio = lazy(() => import('@/components/home/Portfolio'));
const WhatWeOffer = lazy(() => import('@/components/home/WhatWeOffer'));
const WhyChooseUs = lazy(() => import('@/components/home/WhyChooseUs'));

export default function Page() {
    return (
        <main>

            <Suspense fallback={<NewLoader />}>
                <NewLoader />
                <Banner />
                <WhoWeAre />
                <WelcomeEncore />
                <Portfolio />
                <WhatWeOffer />
                <WhyChooseUs />
            </Suspense>
        </main>
    );
}