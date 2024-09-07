import { useState,useContext } from 'react';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useSnackbar } from 'notistack';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const{setUser} = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar();

  axios.defaults.withCredentials =true

  
//   useEffect(() => {
//     axios.get('http://localhost:5555/auth/check')
//         .then(response => {
//             if (response.data.user) {
//                 setUser(response.data.user);
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }, []);

  // const handleSubmit = (e) => {
  //    e.preventDefault();
  //    axios.post("http://localhost:5555/login", { email, password })
  //      .then(result => {
  //        console.log(result);
  //        if (result.data === 'success') {
  //          navigate('/cars');
  //        }
  //      })
  //      .catch(err => console.log(err));
  //  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5555/login", { email, password })
        .then(result => {
            if (result.data.message === 'success') {
                const { accesstoken:token, user } = result.data;
                
                // Store the token and update the user context
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                enqueueSnackbar("logged in successfully", { variant: 'success' })
                // Redirect to the cars page
                navigate('/cars');
            }else{
              const err = result.data.message
              enqueueSnackbar(err, { variant: 'error' });
              navigate('/login')
            }
        })
       .catch(err => console.log(err));
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? 
          <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-semibold"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
