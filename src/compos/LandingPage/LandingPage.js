import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import CoinTable from '../CoinTable';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <div className="hello">
        <h1 className="bigHello">Hello CryptoWorld!</h1>
        <h3 className="small">Your one-stop destination for your crypto quest!</h3>
      </div>
      <Carousel />
      <CoinTable/>
    </div>
  );
};

const Carousel = () => {
  const [slides, setSlides] = useState([]); // This will hold the slides data
  const [currentSlide, setCurrentSlide] = useState(0); // This will track the current slide index
  const { currency } = CryptoState(); // Assuming CryptoState is a function returning an object
  
  const fetchCoinsForCarousel = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setSlides(data); // Set the slides data to the state
    console.log(data);
  };

  const slideDuration = 3000; // Slide duration in milliseconds

  useEffect(() => {
    fetchCoinsForCarousel(); // Fetch data when the component mounts

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, slideDuration);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div id="default-carousel" className="m-auto relative w-2/3 flex-col items-center bg-slate-300 border-4 border-gray-500" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute duration-700 ease-in-out w-full h-full ${index === currentSlide ? 'block' : 'hidden'}`}
            data-carousel-item
          >
            <img
              src={slide.image} 
              className="absolute block w-52 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={slide.name}
            />
            <div className="absolute top-4 left-1/2 flex-col transform -translate-x-1/2 text-center text-2xl font-extrabold text-black px-4 py-2 rounded">
                {slide.name}
                <p className="relative top-0.1 left-1/2 transform -translate-x-1/2 text-center text-xs font-normal text-black px-4 py-2 rounded">
                {`${slide.price_change_percentage_24h}%`}
                </p>
            </div>
            
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'}`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default LandingPage;
