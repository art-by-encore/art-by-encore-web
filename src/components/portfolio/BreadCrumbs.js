"use client"
import React, { useEffect, useState } from 'react'
import { Link } from 'next-view-transitions';
import { portfolioCards } from "@/utils/data";
import { RollText } from '../ui';
import { supabase } from '@/app/lib/supabase-client';

const BreadCrumbs = () => {
    const { list } = portfolioCards;
    const [listData, setListData] = useState([]);
    
    async function getPortfolioData() {
        try {
            console.log('Fetching portfolio data from client...');
            
            // Check if we can connect to Supabase
            const { data: healthCheck, error: healthError } = await supabase
                .from('portfolio')
                .select('count', { count: 'exact', head: true });
            
            console.log('Supabase connection check:', { healthCheck, healthError });
            
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching portfolio:', error);
                return;
            }

            console.log('Fetched portfolio data:', data);
            setListData(data || []);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    useEffect(() => {
        getPortfolioData();
    }, [])
    
    // Use fetched data if available, otherwise fallback to static data
    const displayData = listData.length > 0 ? listData : list;
    // console.log('listData from client:', listData);
    // console.log('displayData being used:', displayData);
    
    return (
        <ul className='flex text-white flex-row flex-wrap font-footer-text gap-[20px] mb-[30px]'>
            {
                displayData?.map((item, index) => {
                    // Handle both static and fetched data structures
                    const href = item.pageUrl 
                        ? `/portfolio/${item.pageUrl}` 
                        : item.content?.card?.pageUrl 
                            ? `/portfolio/${item.content.card.pageUrl}`
                            : item.slug || '#';
                    
                    const title = item.title 
                        || item.content?.card?.cardTitle 
                        || item.seo?.title 
                        || 'Portfolio';
                    
                    return (
                        <li className='text-orange underline' key={item.id || index}>
                            <Link href={href} className=''>
                                <RollText text={title} />
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default BreadCrumbs;