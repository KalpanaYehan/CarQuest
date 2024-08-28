import React from 'react';
import hrs from '../assets/24.webp';
import Guarantee from '../assets/tag.png';
import payment from '../assets/payment.avif';

const Service = () => {
  return (
    <div id="service" className=" bg-yellow-300/50 py-16">
      <h1 className=" text-4xl font-bold mb-5 text-center text-black">Our Premium Services</h1>
      <p className="text-black/75 text-center text-lg mb-8">
      Our CarQuest System is designed to streamline and enhance every aspect of the vehicle sales process
      </p>
      <div className="flex justify-center gap-8 ">
        <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center text-center max-w-xs hover:scale-110 duration-200">
          <img src={hrs} className="h-24 w-24 mb-4" alt="24 Hour Support" />
          <h4 className="text-xl font-semibold mb-4">24/7 Customer Support</h4>
          <p className="text-gray-600 text-sm font-normal">
          Our dedicated support team is available around the clock to assist you with any questions or issues. Whether you need help with a transaction or have inquiries about a vehicle, we're here to ensure a seamless experience.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center text-center max-w-xs hover:scale-110 duration-200">
          <img src={Guarantee} className="h-24 w-24 mb-4" alt="Qualified Assurance" />
          <h4 className="text-xl font-semibold mb-4">Genuine Vehicles Only</h4>
          <p className="text-gray-600 text-sm font-normal">
          We pride ourselves on offering only original, high-quality vehicles. Every car in our inventory undergoes rigorous inspection to guarantee authenticity and reliability.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center text-center max-w-xs hover:scale-110 duration-200">
          <img src={payment} className="h-24 w-24 mb-4" alt="GPS on Cars" />
          <h4 className="text-xl font-semibold mb-4">Flexible Payment Options</h4>
          <p className="text-gray-600 text-sm font-normal">
          Enjoy a variety of payment methods tailored to your needs. From traditional financing to modern digital payments, we offer flexible solutions to make your purchase as convenient as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
