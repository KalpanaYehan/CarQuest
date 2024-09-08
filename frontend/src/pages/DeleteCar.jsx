import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteCar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveCar = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/cars/${id}`)
      .then((res) => {
          if(res.data.message==='Deleted successfully'){
            setLoading(false);
            enqueueSnackbar('Car Deleted successfully', { variant: 'success' });
            navigate('/cars');
          }else if(res.data.message=== "Book not found"){
            setLoading(false);
            enqueueSnackbar('car not found', { variant: 'error' });
            navigate('/cars');
          }else{
            setLoading(false);
            enqueueSnackbar('unsuccess', { variant: 'error' });
            navigate('/cars');
          }
        }
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Error occurred', { variant: 'error' });
      });
  };

  return (
    <div className='p-6 bg-yellow-50 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-bold text-orange-600 my-6 text-center'>Remove Car</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-orange-500 rounded-xl bg-white shadow-md w-full max-w-md p-8 mx-auto'>
        <h3 className='text-2xl font-semibold text-gray-700 mb-4'>Are you sure you want to remove this car?</h3>
        <button
          className='p-4 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300 w-full'
          onClick={handleRemoveCar}
        >
          Yes, Remove it
        </button>
      </div>
    </div>
  );
};

export default DeleteCar;
