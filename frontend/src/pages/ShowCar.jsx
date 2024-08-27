import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowCar = () => {
  const[car,setCar] = useState([])
  const[loading,setLoading]=useState(false)
  const{id} = useParams();

  useEffect(()=>{
    setLoading(true)
    axios
      .get(`http://localhost:5555/cars/${id}`)
      .then((response)=>{
        setCar(response.data)
        setLoading(false)
      })
      .catch((error)=>{
        console.log(error)
        setLoading(false)
      })
  },[])
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Details</h1>
      {loading?(<Spinner/>):(
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{car._id}</span>
            </div>

            <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Model</span>
            <span>{car.model}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Brand</span>
              <span>{car.brand}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{car.publishYear}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(car.createdAt).toString()}</span>
            </div>

            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span>{new Date(car.updatedAt).toString()}</span>
            </div>
          </div>
        )
      }
      
    </div>
  )
}

export default ShowCar
