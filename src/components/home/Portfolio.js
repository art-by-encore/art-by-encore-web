import React from 'react'
import { Container } from '../ui';
import DiagonalImageGallery from './DiagonalImageGallery';
import SpotlightGallery from './SpotlightGallery';
const Portfolio = () => {
    return (
        <section className='lg:pt-[80px] md:pt-[60px] pt-[40px] h-auto overflow-x-hidden'>
            <Container>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <h2 className='font-title-60 text-white'>Our Prominent</h2>
                        <h2 className='font-title-60 text-white'>& Illustrious</h2>
                        <h2 className='font-title-80 text-orange'>Portfolio.</h2>
                    </div>
                </div>
            </Container>
            <DiagonalImageGallery className="md:hidden block" />
            <SpotlightGallery className="hidden md:block" />
        </section>
    )
}

export default Portfolio;
