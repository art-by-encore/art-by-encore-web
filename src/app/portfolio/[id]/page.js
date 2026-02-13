import React from "react";
import {
  NewLoader,
  InnerPagesBannerMaxWidth,
  NoDataFound,
  Container,
} from "@/components/ui";
import { createServerSupabaseClient } from "@/app/lib/supabase";
import { seo } from "@/utils/data";
import { PortfolioContainer } from "@/components/portfolio";
const { ourPortfolioSEO } = seo;

// Revalidate every 60 seconds
export const revalidate = 60;

//
// ✅ Generate Static Params
//
export async function generateStaticParams() {
  const supabase = createServerSupabaseClient();

  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("content");

    if (error) {
      console.error("Error fetching static params:", error);
      return [];
    }

    return (data || [])
      .filter((item) => item?.content?.card?.pageUrl)
      .map((item) => ({
        id: item.content.card.pageUrl,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

//
// ✅ Get Portfolio Item by pageUrl
//
async function getPortfolioBySlug(slug) {
  const supabase = createServerSupabaseClient();

  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("content->card->>pageUrl", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching portfolio item:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}

//
// ✅ Dynamic Metadata
//
export async function generateMetadata({ params }) {
  const { id } = params;

  const item = await getPortfolioBySlug(id);

  if (!item) {
    return {
      title: ourPortfolioSEO?.title || "Portfolio",
      description:
        ourPortfolioSEO?.description || "Explore our creative portfolio",
    };
  }

  const seoData = item.seo || {};

  return {
    title: seoData.title || item.content?.card?.cardTitle || "Portfolio",
    description:
      seoData.description ||
      ourPortfolioSEO?.description ||
      "Portfolio details",

    keywords: seoData.keywords || ourPortfolioSEO?.keywords,
    robots: seoData.metaRobots || "index, follow",
    viewport: seoData.metaViewport || "width=device-width, initial-scale=1",

    alternates: {
      canonical:
        seoData.canonicalURL ||
        `https://art-by-encore-web.vercel.app/portfolio/${id}`,
    },

    openGraph: {
      title:
        seoData.openGraph?.title ||
        seoData.title ||
        item.content?.card?.cardTitle,

      description:
        seoData.openGraph?.description ||
        seoData.description ||
        ourPortfolioSEO?.openGraph?.description,

      url:
        seoData.openGraph?.url ||
        `https://art-by-encore-web.vercel.app/portfolio/${id}`,

      type: seoData.openGraph?.type || "website",

      images: [
        {
          url:
            seoData.openGraph?.image ||
            item.content?.card?.cardBackgroundImage,
        },
      ],
    },
  };
}

//
// ✅ Page Component
//
export default async function Page({ params }) {
  const { id } = params;

  const item = await getPortfolioBySlug(id);

  if (!item) {
    return (
      <main>
        <Container>
          <NoDataFound data={`Portfolio "${id}" not found`} />
        </Container>
      </main>
    );
  }

  const { content, banner } = item;

  const bannerData = banner || {
    title: content?.card?.cardTitle || "Portfolio",
    description:
      "Our prominent and illustrious portfolio stands out in the market due to its believable outcome and attention to detail.",
    videoUrl: "",
    poster: content?.card?.cardBackgroundImage || "",
  };

  return (
    <main>
      <NewLoader />
      <InnerPagesBannerMaxWidth data={bannerData} />
      <PortfolioContainer data={content} />
      {/* Add your gallery component here if needed */}
    </main>
  );
}
