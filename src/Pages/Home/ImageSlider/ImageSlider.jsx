import React, { useEffect, useState } from 'react';



const ImageSlider = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when the user scrolls down 100px from the top
    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };


    const images = [
      
        "https://mobilebuzzbd.com/wp-content/uploads/2025/05/Untitled-2.jpg",
        "https://www.applegadgetsbd.com/_next/image?url=https%3A%2F%2Fadminapi.applegadgetsbd.com%2Fstorage%2Fmedia%2Flarge%2FMacBook-Air-M4-13-Inch-1621.jpg&w=1920&q=75",
        "https://sumashtechbucket.s3.ap-south-1.amazonaws.com/images/web/slider/iPhone-16-Series.webp",
        "https://mobilebuzzbd.com/wp-content/uploads/2025/06/01-2-1536x839.jpg",
        
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="relative overflow-hidden w-full object-cover mt-[45px]">
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full object-cover md:h-[500px] ">
                        <img
                            src={image}
                            alt={`carousel-image-${index}`}
                            className="w-full   h-auto   object-contain cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 outline-1 md:outline-2 outline-red-600 rounded-full bg-red-500 ${currentIndex === index ? "p-1" : "bg-opacity-0"
                            } cursor-pointer transition-all`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;

