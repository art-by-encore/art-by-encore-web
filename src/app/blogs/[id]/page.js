import React from 'react';
import { NewLoader, InnerPagesBanner, NoDataFound, Container } from "@/components/ui";
import BlogsDetails from '@/components/blogs/BlogsDetails';
import { createServerSupabaseClient } from '@/app/lib/supabase';
import { seo } from '@/utils/data';
const { blogsSEO } = seo;

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static paths for all blog slugs
export async function generateStaticParams() {
    const supabase = createServerSupabaseClient();

    try {
        const { data } = await supabase
            .from('blogs')
            .select('content');

        return (data || [])
            .filter(blog => blog.content?.cta?.slug)
            .map(blog => ({
                slug: blog.content.cta.slug,
            }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Fetch blog by slug from Supabase
async function getBlogBySlug(slug) {
    const supabase = createServerSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('content->cta->>slug', slug)
            .maybeSingle();

        if (error) {
            console.error('Error fetching blog:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { id } = params;
    const blog = await getBlogBySlug(id);

    // Use blog's own SEO data if available
    if (blog?.seo) {
        return {
            title: blog.seo.title || blogsSEO?.title,
            description: blog.seo.description || blogsSEO?.description,
            keywords: blog.seo.keywords || blogsSEO?.keywords,
            robots: blog.seo.metaRobots || blogsSEO?.metaRobots,
            viewport: blog.seo.metaViewport || blogsSEO?.metaViewport,
            alternates: {
                canonical: blog.seo.canonicalURL || blogsSEO?.canonicalURL,
            },
            openGraph: {
                title: blog.seo.openGraph?.title || blog.seo.title || blogsSEO?.openGraph?.title,
                description: blog.seo.openGraph?.description || blog.seo.description || blogsSEO?.openGraph?.description,
                url: blog.seo.openGraph?.url || blog.seo.canonicalURL || blogsSEO?.openGraph?.url,
                type: blog.seo.openGraph?.type || blogsSEO?.openGraph?.type || 'article',
                image: blog.seo.openGraph?.image || blog.content?.thumbImage || blogsSEO?.openGraph?.image,
            },
        };
    }

    // Fallback to default SEO data
    return {
        title: blog?.content?.title || blogsSEO?.title || 'Blog Details',
        description: blog?.content?.description?.[0]?.text || blogsSEO?.description || 'Read our blog post',
        keywords: blogsSEO?.keywords || 'blog, article, post',
        robots: blogsSEO?.metaRobots || 'index, follow',
        viewport: blogsSEO?.metaViewport || 'width=device-width, initial-scale=1',
        alternates: {
            canonical: blogsSEO?.canonicalURL || `https://yourwebsite.com/blogs/${slug}`,
        },
        openGraph: {
            title: blog?.content?.title || blogsSEO?.openGraph?.title || 'Blog Details',
            description: blog?.content?.description?.[0]?.text || blogsSEO?.openGraph?.description || 'Read our blog post',
            url: blogsSEO?.openGraph?.url || `https://yourwebsite.com/blogs/${slug}`,
            type: 'article',
            image: blog?.content?.thumbImage || blogsSEO?.openGraph?.image,
        },
    };
}

export default async function Page({ params }) {
    const { id } = params;

    // Fetch blog by slug
    const blog = await getBlogBySlug(id);

    if (!blog) {
        return (
            <main className="">
                <Container>
                    <NoDataFound data={`Blog with slug "${id}" not found`} />
                </Container>
            </main>
        );
    }

    const { content, seo, banner } = blog;

    // Use the blog's own banner data
    const bannerData = banner || {
        title: 'Our Blogs',
        description: 'Read our latest articles and insights',
        videoUrl: '',
        poster: '',
    };

    return (
        <main className="">
            <NewLoader />
            <InnerPagesBanner data={bannerData} />
            <BlogsDetails content={content} />
        </main>
    );
}