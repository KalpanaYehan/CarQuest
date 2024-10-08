import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from '../components/Validation';
import { useSnackbar } from 'notistack';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors,setErrors] = useState({})
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
     e.preventDefault();
     const validationErrors = Validation({name,email,password})
     setErrors(validationErrors)

     if(Object.keys(validationErrors).length === 0){
      axios.post("https://car-quest-ochre.vercel.app/register", { name, email, password,role })
      .then(result => {
        console.log(result);
        setName("")
        setEmail("")
        setPassword("")
        setErrors({})
        if(result.data.message==='success'){
          enqueueSnackbar('Account Created successfully', { variant: 'success' })
          navigate('/login')
        }else if(result.data.message==='Email already exists')
          enqueueSnackbar('Email already exists', { variant: 'error' })
      })
      .catch(err => {
        console.log(err)
        enqueueSnackbar('somthing went wrong', { variant: 'error' })
      })
     }else{
      console.log("Validation errors:", validationErrors);
     }
     
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4"  onSubmit={handleSubmit} >
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.name && <p className='text-red-600 font-light'>{errors.name}</p>}
          </div>
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
            {errors.email && <p className='text-red-600 font-light'>{errors.email}</p>}
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
            {errors.password && <p className='text-red-600 font-light'>{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
