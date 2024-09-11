import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCar = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [publishYear, setPublishYear] = useState('');
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [img, setImg] = useState('');
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://car-quest-ochre.vercel.app/cars/${id}`)
      .then((response) => {
        setModel(response.data.model);
        setPublishYear(response.data.publishYear);
        setBrand(response.data.brand);
        setPrice(response.data.price);
        setMileage(response.data.mileage);
        setImg(response.data.img);
        setCondition(response.data.condition);
        setDescription(response.data.description);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Check console for details.', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditCar = () => {
    const data = {
      model,
      brand,
      publishYear,
      price,
      mileage,
      img,
      condition,
      description
    };
    setLoading(true);
    axios
      .put(`https://car-quest-ochre.vercel.app/${id}`, data)
      .then((response) => {
        if(response.data.message==='successfully updated'){
          setLoading(false);
          enqueueSnackbar('successfully updated', { variant: 'success' });
          navigate('/cars');
        }else if(response.data.message=== "car not found"){
          setLoading(false);
          enqueueSnackbar('car not found', { variant: 'error' });
          navigate('/cars');
        }else if(response.data.message=== "send all required field"){
          setLoading(false);
          enqueueSnackbar('send all required field', { variant: 'error' })
        }else{
          setLoading(false);
          enqueueSnackbar('unsuccess', { variant: 'error' });
          navigate('/cars');
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing car', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-orange-50 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-bold text-yellow-600 my-6 text-center'>Edit Car</h1>
      {loading && <Spinner />}
      <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <div className='space-y-4'>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Model</label>
            <input
              type='text'
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Brand</label>
            <input
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Price</label>
            <input
              type='text'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Mileage</label>
            <input
              type='text'
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Image URL</label>
            <input
              type='text'
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Condition</label>
            <input
              type='text'
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-lg font-semibold text-gray-700 mb-2'>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:ring-yellow-500 focus:border-yellow-500'
            />
          </div>
        </div>
        <button
          className='mt-6 w-full p-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300'
          onClick={handleEditCar}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCar;
