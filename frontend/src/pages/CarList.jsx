import React,{useEffect,useState,useContext} from 'react'
import axios from "axios"
import Spinner from '../components/Spinner'
import { Link,useNavigate} from 'react-router-dom'
import{AiOutlineEdit} from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import CarsTable from '../components/Home/CarsTable'
import CarsCard from '../components/Home/CarsCard'
import { AuthContext } from '../context/AuthContext'
import AdminModal from '../components/Home/AdminModel'
import LogoutButton from '../components/LogoutButton'

const CarList = () => {

    const{user} =useContext(AuthContext)
    const [post,setPost] = useState([])
    const[cars,setCar] = useState([])
    const[loading,setLoading] = useState(false)
    const[showType,setShowType]=useState('table')
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [sortField, setSortField] = useState('model');
    const [sortBy, setSortBy] = useState('ascending');
    const [result, setResult] = useState();


    axios.defaults.withCredentials = true

    useEffect(()=>{
        setLoading(true)
        axios
            .get('http://localhost:5555/cars')
            .then((response)=>{
                if(response.data.message !== "success") {
                    navigate('/login');
                }else{
                    setPost(response.data.data)
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

      const handleChange = (e) => {
        const results = post.filter((post) => {
          if (e.target.value === "") return post;
          return post[sortField].toLowerCase().includes(e.target.value.toLowerCase());
        });
    
        setResult(results);
        setQuery(e.target.value);
        setCar(sortFun(results, sortBy, sortField));
      }; 
    
      const changeSortField = (field) => {
        setSortField(field);
        setCar(!result ? sortFun(post, sortBy, field) : sortFun(result, sortBy, field));
      };
    
      const changeSortType = (type) => {
        setSortBy(type);
        setCar(!result ? sortFun(post, type, sortField) : sortFun(result, type, sortField));
      };
    
      const sortFun = (result, sortby, sortfield) => {
        if (sortby === 'ascending') {
          result.sort((a, b) => (a[sortfield] < b[sortfield] ? -1 : 1));
        } else if (sortby === 'descending') {
          result.sort((a, b) => (a[sortfield] < b[sortfield] ? 1 : -1));
        }
        return result;
      };
    

  return (
    <div className='p-4 bg-yellow-50'>
        
        <div className='flex justify-between items-center'>
            {/* <h1 className='text-3xl my-8'>Cars List</h1> */}
            {/* {user && user.role === 'admin' && (
                    <Link to='/cars/create'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
                    </Link>
                )} */}

        </div>


        <div className='mb-4'>
    <div className="bg-cover bg-bottom" style={ {backgroundImage: `url('https://iot-automotive.news/wp-content/uploads/2021/08/Continental_Cockpit.jpg')`}}>
        <div className='flex flex-row gap-4 py-32 mb-6 mx-w-l m-auto  justify-center'>
          <div className="mb-4 w-[30%]">
            <span className="block text-lg font-bold mb-2 text-white">Search</span>
            <input 
              type="search" 
              placeholder="Search" 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <span className="block text-white text-lg font-bold mb-2">Sort Field:</span>
            <select 
              name="field" 
              onChange={(e) => changeSortField(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="model">Model</option>
              <option value="brand">Brand</option>
            </select>
          </div>
          <div className="mb-4">
            <span className="block text-white text-lg font-bold mb-2">Sort By:</span>
            <select 
              name="type" 
              onChange={(e) => changeSortType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          </div>

          <div className='flex justify-center items-center gap-x-4 py-8'>
            <button className='bg-white hover:bg-orange-100 px-8 py-4 rounded-lg border-2 border-black font-bold' onClick={() => setShowType('table')}>
                Table View
            </button>
            <button className='bg-white hover:bg-orange-100 px-8 py-4 rounded-lg border-2 border-black font-bold' onClick={() => setShowType('card')}>
                Card View
            </button>
            {user && user.role === 'admin' && (
                  <>
                    <Link to='/cars/create'>
                        <button className='flex hover:bg-green-600 px-6 py-2 rounded-lg border-2 border-black font-bold bg-green-500' onClick={() => setShowType('card')}>
                          Add car
                        </button>
                    </Link>
                    <AdminModal/>
                  </>
                )}
            <LogoutButton/>
        </div>
        </div>


        {loading?(<Spinner/>) : showType==='table'?
            (<CarsTable cars={cars}/>):
            (<CarsCard cars={cars}/>)
            
        
        }    
    </div>
      
   </div>
  )
}

export default CarList
