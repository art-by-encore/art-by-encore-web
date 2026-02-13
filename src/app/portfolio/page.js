import { NewLoader, InnerPagesBannerMaxWidth } from "@/components/ui";
import { createServerSupabaseClient } from "../lib/supabase";
import PortfolioCards from "@/components/portfolio/PortfolioCards";
import { seo } from '@/utils/data';
const { ourPortfolioSEO } = seo;

// Add this to disable caching and always fetch fresh data
export const revalidate = 0; // Always fetch fresh data
// OR
export const dynamic = 'force-dynamic'; // Force dynamic rendering

// Fetch specific SEO banner by hardcoded ID
async function getSEOBannerById() {
    const supabase = createServerSupabaseClient();
    const BANNER_ID = "2"; 

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
async function getPortfolioData() {
    const supabase = createServerSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('portfolio')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching portfolio:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function generateMetadata() {
    const seoBannerData = await getSEOBannerById();

    const defaultSEO = {
        title: ourPortfolioSEO?.title,
        description: ourPortfolioSEO?.description,
        keywords: ourPortfolioSEO?.keywords,
        robots: ourPortfolioSEO?.metaRobots,
        viewport: ourPortfolioSEO?.metaViewport,
        alternates: {
            canonical: ourPortfolioSEO?.canonicalURL,
        },
        openGraph: ourPortfolioSEO?.openGraph,
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

export default async function Page() {
    const [seoBannerData, portfolioList] = await Promise.all([
        getSEOBannerById(),
        getPortfolioData()
    ]);

    const bannerData = seoBannerData?.banner || {
        title: 'Our Portfolio',
        description: 'Our prominent and illustrious portfolio stands out in the market due to its believable outcome and attention to detail.',
        videoUrl: '',
        poster: '',
    };
    
    return (
        <main className="">
            <NewLoader />
            <InnerPagesBannerMaxWidth data={bannerData} />
            <PortfolioCards data={portfolioList} />
        </main>
    );
}