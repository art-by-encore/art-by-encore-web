import { NewLoader, InnerPagesBanner } from "@/components/ui";
import { BlogsListing } from "@/components/blogs";
import { createServerSupabaseClient } from "../lib/supabase";
import { seo } from '@/utils/data';
const { blogsSEO } = seo;

// Add this to disable caching and always fetch fresh data
export const revalidate = 0; // Always fetch fresh data
// OR
export const dynamic = 'force-dynamic'; // Force dynamic rendering

// Fetch specific SEO banner by ID
async function getSEOBannerById() {
    const supabase = createServerSupabaseClient();
    const BANNER_ID = "3"; // Hardcoded ID - replace with your actual ID

    try {
        const { data, error } = await supabase
            .from('seo_banners')
            .select('*')
            .eq('id', BANNER_ID)
            .single();

        if (error) {
            console.error('Error fetching SEO banner:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Fetch blogs data with no cache
async function getBlogsData() {
    const supabase = createServerSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function generateMetadata({ searchParams }) {
    const seoBannerData = await getSEOBannerById();

    const defaultSEO = {
        title: blogsSEO?.title,
        description: blogsSEO?.description,
        keywords: blogsSEO?.keywords,
        robots: blogsSEO?.metaRobots,
        viewport: blogsSEO?.metaViewport,
        alternates: {
            canonical: blogsSEO?.canonicalURL,
        },
        openGraph: blogsSEO?.openGraph,
    };

    if (!seoBannerData) {
        return defaultSEO;
    }

    return {
        title: seoBannerData.seo?.title || defaultSEO.title,
        description: seoBannerData.seo?.description || defaultSEO.description,
        keywords: seoBannerData.seo?.keywords || defaultSEO.keywords,
        robots: seoBannerData.seo?.metaRobots || defaultSEO.metaRobots,
        viewport: seoBannerData.seo?.metaViewport || defaultSEO.metaViewport,
        alternates: {
            canonical: seoBannerData.seo?.canonicalURL || defaultSEO.canonicalURL,
        },
        openGraph: {
            title: seoBannerData.seo?.openGraph?.title || defaultSEO.openGraph.title,
            description: seoBannerData.seo?.openGraph?.description || defaultSEO.openGraph.description,
            url: seoBannerData.seo?.openGraph?.url || defaultSEO.openGraph.url,
            type: seoBannerData.seo?.openGraph?.type || defaultSEO.openGraph.type,
            image: seoBannerData.seo?.openGraph?.image || defaultSEO.openGraph.image,
        },
    };
}

export default async function Page({ searchParams }) {
    const [seoBannerData, blogsList] = await Promise.all([
        getSEOBannerById(),
        getBlogsData()
    ]);

    const bannerData = seoBannerData?.banner || {
        title: 'Our Blogs',
        description: 'Read our latest articles and insights',
        videoUrl: '',
        poster: '',
    };

    return (
        <main className="">
            <NewLoader />
            <InnerPagesBanner data={bannerData} />
            <BlogsListing list={blogsList} />
        </main>
    );
}