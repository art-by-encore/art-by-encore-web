"use client"
import React from 'react'
import { NoDataFound, Container } from '../ui';
import ImageGalleryInt from "./ImageGalleryInt";
import VideoGalleryInt from "./VideoGalleryInt";
import ImageVideoGalleryInt from "./ImageVideoGalleryInt"
const PortfolioContainer = (props) => {
    const { data } = props;
    // console.log('props', data?.imageVideoTabsGallery);
    if (!data) {
        return <Container> <NoDataFound /></Container>
    }
    return (
        <div>
            {
                data?.imageGallery && <ImageGalleryInt data={data?.imageGallery} />
            }
            {
                data?.videoGallery && <VideoGalleryInt data={data?.videoGallery} />
            }
            {
                data?.imageVideoTabsGallery && <ImageVideoGalleryInt data={data?.imageVideoTabsGallery} />
            }
        </div>
    )
}

export default PortfolioContainer