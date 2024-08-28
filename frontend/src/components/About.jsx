import React from 'react';
import about from '../assets/aboutus.jpg';

const About = () => {
  return (
    <div id="about" className='bg-yellow-100/50 pt-15'>
    <h1 className="text-4xl font-bold text-center items-center pt-10 ">About Us</h1>
    <div  className="h-[450px] flex justify-center">
      <div className="flex flex-wrap items-center gap-5 pb-5">
        <div className="flex-1 max-w-md mx-auto lg:mx-0">
          <img
            src={about}
            className="w-full h-auto object-cover rounded-full"
            alt="Car"
            width="800"
            height="700"
            loading="lazy"
          />
        </div>

        <div className="flex-1 max-w-lg ">
          <p className="text-lg leading-relaxed text-justify">
          At CarQuest, we are dedicated to revolutionizing the car buying and selling experience. 
          Our mission is to provide a seamless, transparent, and customer-centric platform that 
          caters to all your automotive needs. With a commitment to offering only genuine, high-quality 
          vehicles, we ensure that every car in our inventory meets our stringent standards. Our 24/7 
          customer support is always ready to assist you, and our flexible payment options make 
          transactions smooth and convenient. Discover the difference with [Your Company Name] and 
          experience a new standard in car sales.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
