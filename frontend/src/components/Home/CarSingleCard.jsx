import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaTag } from 'react-icons/fa';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import CarModal from './CarModal';
import { AuthContext } from '../../context/AuthContext';

const CarSingleCard = ({ car }) => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    return (
        <div className='border-2 border-black rounded-lg px-4 py-2 m-4 relative hover:shadow-lg hover:scale-105 transition-all duration-300' style={{backgroundImage:`url(${car.img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
              {showModal && (
                <CarModal car={car} onClose={handleModalToggle} />
            )}
          <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 rounded-lg z-10"></div>
          <div className='relative z-20'>
            <h2 className='absolute top-1 right-2 px-4 py-1  text-white font-bold rounded-lg border-2 border-white'>
                {car.publishYear}
            </h2>
            <h4 className='my-2 text-white'>{car._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <FaCar className='text-white text-xl' />
                <h2 className='my-1 text-white font-bold'>{car.model}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <FaTag className='text-white text-xl' />
                <h2 className='my-1 text-white font-bold'>{car.brand}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <BiShow
                    className='text-3xl text-white hover:scale-110 cursor-pointer transition-colors duration-200'
                    onClick={handleModalToggle}
                />
                <Link to={`/cars/details/${car._id}`}>
                    <BsInfoCircle className='text-2xl text-white hover:scale-110 transition-colors duration-200' />
                </Link>
                {user && user.role === 'admin' && (
                    <>
                        <Link to={`/cars/edit/${car._id}`}>
                            <AiOutlineEdit className='text-2xl text-white hover:scale-110 transition-colors duration-200' />
                        </Link>
                        <Link to={`/cars/delete/${car._id}`}>
                            <MdOutlineDelete className='text-2xl text-white hover:scale-110 transition-colors duration-200' />
                        </Link>
                    </>
                )}
            </div>
          
          </div>
        </div>
    );
};

export default CarSingleCard;
