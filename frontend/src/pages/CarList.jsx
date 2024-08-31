import React,{useEffect,useState} from 'react'
import axios from "axios"
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import{AiOutlineEdit} from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import CarsTable from '../components/Home/CarsTable'
import CarsCard from '../components/Home/CarsCard'
const CarList = () => {
    const[cars,setCar] = useState([])
    const[loading,setLoading] = useState(false)
    const[showType,setShowType]=useState('card')
    axios.defaults.withCredentials = true
    useEffect(()=>{
        setLoading(true)
        axios
            .get('http://localhost:5555/cars')
            .then((response)=>{
                if(response.data.message !== "success") {
                    navigate('/login');
                }else{
                    setCar(response.data.data)
                    setLoading(false)
                }
            })
            .catch((error)=>{
                console.log(error)
                setLoading(false)
                navigate('/login')
            })

    },[])

  return (
    <div className='p-4 bg-yellow-50'>
        <div className='flex justify-center items-center gap-x-4 pt-5'>
            <button className='bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>
                Table
            </button>
            <button className='bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>
                Card
            </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Cars List</h1>
            <Link to='/cars/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl'/>
            </Link>

        </div>
        {loading?(<Spinner/>) : showType==='table'?
            (<CarsTable cars={cars}/>):
            (<CarsCard cars={cars}/>)
            
        
        }    
    </div>
      
   
  )
}

export default CarList
