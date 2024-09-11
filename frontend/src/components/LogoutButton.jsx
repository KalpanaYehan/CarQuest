import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    axios.defaults.withCredentials = true
    
    const handleLogout=()=>{
        // Remove JWT token from cookies or localStorage
        
        axios
            .post('https://car-quest-ochre.vercel.app/logout')
            .then((res)=>{
                if(res.data.message ==="Logged out successfully"){
                    document.cookie = 'accesstoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                    localStorage.removeItem('user')
                    enqueueSnackbar('successfully logged out', { variant: 'success' });
                    navigate('/');
                }
            })
            .catch((err)=>{
                console.log(err)
            }) 
        }

  return (
    <button onClick={handleLogout} className='flex items-center'>
      <FiLogOut className='text-4xl text-white hover:scale-110 transition-colors duration-200' />
    </button>
  );
};

export default LogoutButton;
