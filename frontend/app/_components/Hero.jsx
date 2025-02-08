"use client";
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules'; // Correct import for Swiper v8+
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Solde from './Solde'; // Import the Solde component

function Hero() {
  useEffect(() => {
    // Ensure Swiper navigation links are set correctly
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');

    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        // Implement custom logic if needed when clicking arrows
      });

      nextButton.addEventListener('click', () => {
        // Implement custom logic if needed when clicking arrows
      });
    }
  }, []);

  return (
    <section className="bg-gray-900 text-white">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2000, // Slide every 2 seconds
          disableOnInteraction: false, // Keep autoplay working even if the user interacts
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        loop={true} // Ensure it loops back to the first slide
        className="h-96"
        modules={[Pagination, Navigation]} // Register the necessary modules
      >
        {[...Array(3)].map((_, index) => (
          <SwiperSlide key={index}>
            <Solde /> {/* Add the Solde component */}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev custom-arrow"></div>
      <div className="swiper-button-next custom-arrow"></div>
    </section>
  );
}

export default Hero;
