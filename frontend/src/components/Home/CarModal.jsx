import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const CarModal = ({ car, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[90vw] max-w-[600px] h-[80vh] max-h-[80vh] bg-white rounded-xl p-6 flex flex-col relative shadow-lg overflow-y-auto"
      >
        <AiOutlineClose
          className="absolute top-4 right-4 text-3xl text-red-500 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-yellow-400 text-orange-800 rounded-lg font-semibold">
          {car.publishYear}
        </h2>
        <h4 className="my-2 text-gray-700">{car._id}</h4>
        <div className="flex items-center gap-x-2">
          <PiBookOpenTextLight className="text-yellow-400 text-3xl" />
          <h2 className="my-1 text-gray-800">{car.model}</h2>
        </div>
        <div className="flex items-center gap-x-2">
          <BiUserCircle className="text-yellow-400 text-3xl" />
          <h2 className="my-1 text-gray-800">{car.brand}</h2>
        </div>
        <p className="mt-4 text-gray-700 font-semibold">Details:</p>
        <p className="my-2 text-gray-600">{car.description}</p>
      </div>
    </div>
  );
};

export default CarModal;
