import React from 'react'
import BackButton from '../components/BackButton'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

const DeleteCar= () => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = ()=>{
    setLoading(true)
    axios
      .delete(`http://localhost:5555/cars/${id}`)
      .then(()=>{
        setLoading(false)
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' })
        navigate('/')
      })

      .catch((error)=>{
        console.log(error)
        setLoading(false)
        enqueueSnackbar('Error', { variant: 'error' });
        
      }
      )
  }

  return (
    <div>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading?(Spinner):''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full'onClick={handleDeleteBook}>Yes,delete it</button>
      </div>
    </div>
   
  )
}

export default DeleteCar
