import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowCar = () => {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-6 bg-orange-50 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-bold text-yellow-600 my-6 text-center'>Car Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6'>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>ID:</span>
              <span className='text-lg text-gray-900'>{car._id}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Model:</span>
              <span className='text-lg text-gray-900'>{car.model}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Brand:</span>
              <span className='text-lg text-gray-900'>{car.brand}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Publish Year:</span>
              <span className='text-lg text-gray-900'>{car.publishYear}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Price:</span>
              <span className='text-lg text-gray-900'>{car.price}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Mileage:</span>
              <span className='text-lg text-gray-900'>{car.mileage}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Condition:</span>
              <span className='text-lg text-gray-900'>{car.condition}</span>
            </div>
            <div className='flex justify-center gap-16'>
              <span className='text-lg font-semibold text-gray-700'>Description:</span>
              <span className='text-lg text-gray-900 text-left'>{car.description}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Created At:</span>
              <span className='text-lg text-gray-900'>{new Date(car.createdAt).toLocaleString()}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold text-gray-700'>Updated At:</span>
              <span className='text-lg text-gray-900'>{new Date(car.updatedAt).toLocaleString()}</span>
            </div>
            <div className=''>
              <div className='text-lg font-semibold text-gray-700'>Photo:</div>
              <img src={car.img} className='w-full h-auto mt-2 rounded-lg'></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCar;
