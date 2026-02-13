import Image from "next/image";
import { NewLoader, InnerPagesBanner } from "@/components/ui";
import ContactForm from "@/components/contact/ContactForm";
import { seo } from '@/utils/data';
const { contactUsSEO } = seo;
export const metadata = {
    title: contactUsSEO?.title,
    description: contactUsSEO?.description,
    keywords: contactUsSEO?.keywords,
    robots: contactUsSEO?.metaRobots,
    viewport: contactUsSEO?.metaViewport,
    alternates: {
        canonical: contactUsSEO?.canonicalURL,
    },
    openGraph: contactUsSEO?.openGraph,
};
export default function Page() {
    const banner = {
        title: 'Contact Us',
        description: `Let's connect and chat about anything you need.`,
        videoUrl: "/assets/videos/hero-video.mp4",
        poster:"/assets/videos/banner-poster.png",
    }
    return (
        <main className="">
            <NewLoader />
            <InnerPagesBanner data={banner} />
            <ContactForm />
        </main>
    );
}
