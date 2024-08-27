import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';

const EditCar = () => {
  const[model,setModel] = useState("")
  const[brand,setBrand] = useState("")
  const[publishYear,setPublishYear] = useState('')
  const[price,setPrice] = useState("")
  const[mileage,setMileage] = useState("")
  const[fuelType,setFuelType] = useState('')
  const[condition,setCondition] = useState("")
  const[description,setDescription] = useState("")
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} =useParams()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`http://localhost:5555/cars/${id}`)
      .then((response)=>{
        setModel(response.data.model)
        setPublishYear(response.data.publishYear)
        setBrand(response.data.brand)
        setPrice(response.data.price)
        setMileage(response.data.mileage)
        setFuelType(response.data.fuelType)
        setCondition(response.data.condition)
        setDescription(response.data.description)
        setLoading(false);
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error)
      })
     
  },[])

  const handleEditCar= ()=>{
    const data = {
      model,
      brand,
      publishYear,
      price,
      mileage,
      fuelType,
      condition,
      description
    }
    setLoading(true);
    axios
      .put(`http://localhost:5555/cars/${id}`,data)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/')
      })
      .catch((error)=>{
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error)
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Car</h1>
      {loading ? (<Spinner/>) :''}
      <div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Model</label>
          <input
            type='text'
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Brand</label>
          <input
            type='text'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Mileage</label>
          <input
            type='text'
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>FuelType</label>
          <input
            type='text'
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Condition</label>
          <input
            type='text'
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleEditCar}>Save</button>
      
    </div>
  )
}

export default EditCar
