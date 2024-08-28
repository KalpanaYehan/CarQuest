import React from 'react';
import amg from '../assets/yellowcar.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div id="hero" className="relative">
        <div className='w-full h-[100vh] bg-cover bg-center bg-fixed' 
            style={{
            backgroundImage:`url(${amg})`,
            backgroundColor:'#f2f2f2'
            }}
        >
        {/* Dark overlay */}
        <div 
            className="absolute inset-0 bg-black opacity-50" 
        ></div>
        
        </div>
        <div className="absolute inset-0 flex items-center justify-start text-white bg-black bg-opacity-20 p-10">
         <div className="pl-20">
           <h1 className="text-8xl font-bold mb-3 leading-tight">Discover Your Perfect Ride with Our CarQuest</h1>

           <p className="text-white text-4xl mb-1">CarQuest is ready to serve the best experience </p>
         </div>
         <div className="hidden lg:block lg:w-1/2">
           {/* You can add more content here if needed */}
         </div>
       </div>
    </div>

    // <div id="hero" className="relative">
    //   <div id="hero-section" className="relative">
    //     <div className="flex justify-center">
    //       <img
    //         src={amg}
    //         className="w-full max-w-screen-xl mx-auto object-cover"
    //         alt="Car"
    //         width="1200"
    //         height="800"
    //         loading="lazy"
    //       />
    //     </div>
    //   </div>

    //   {/* Second Row (Text Overlay) */}
    //   <div className="absolute inset-0 flex items-center justify-start text-white bg-black bg-opacity-20 p-10">
    //     <div className="max-w-lg">
    //       <h1 className="text-5xl font-bold mb-3 leading-tight">Discover Your Perfect Ride with Our CarQuest</h1>

    //       <p className="text-white text-lg mb-1">CarQuest is ready to serve the best experience </p>
    //     </div>
    //     <div className="hidden lg:block lg:w-1/2">
    //       {/* You can add more content here if needed */}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Hero;
