
import { NewLoader, InnerPagesBanner } from "@/components/ui";
import Testimonials from "@/components/testimonials/Testimonials";
import { seo } from '@/utils/data';
const { testimonialsSEO } = seo;
export const metadata = {
    title: testimonialsSEO?.title,
    description: testimonialsSEO?.description,
    keywords: testimonialsSEO?.keywords,
    robots: testimonialsSEO?.metaRobots,
    viewport: testimonialsSEO?.metaViewport,
    alternates: {
        canonical: testimonialsSEO?.canonicalURL,
    },
    openGraph: testimonialsSEO?.openGraph,
};
export default function Page() {
    const banner = {
        title: 'Testimonials',
        description: `Stories that reflect our commitment and quality.`,
        videoUrl: "/assets/videos/hero-video.mp4",
        poster:"/assets/videos/banner-poster.png",
    }
    return (
        <main className="">
            {/* <Loader /> */}
            <NewLoader />
            <InnerPagesBanner data={banner} />
            <Testimonials />
        </main>
    );
}
