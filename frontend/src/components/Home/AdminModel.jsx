import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from '../Validation';
import { useSnackbar } from 'notistack';


const AdminModal = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("admin");
        const [errors,setErrors] = useState({})
        const navigate = useNavigate();
        const { enqueueSnackbar } = useSnackbar();

        const handleSubmit = (e) => {

           e.preventDefault();
           const validationErrors = Validation({name,email,password})
           setErrors(validationErrors)

           if(Object.keys(validationErrors).length === 0){
            axios.post("https://car-quest-ochre.vercel.app/cars/register", { name, email, password,role })
              .then(result => {
                console.log(result);
                setName("")
                setEmail("")
                setPassword("")
                setErrors({})
                enqueueSnackbar('Account Created successfully', { variant: 'success' });
                toggleModal()
              })
              .catch(err => {
                console.log(err)
              enqueueSnackbar('somthing went wrong', { variant: 'error' })
              });
            }else{
              console.log("Validation errors:", validationErrors);
            }
          }

        const toggleModal = () => {
            setIsOpen(!isOpen);
        };

  
    return (
        <>
            {/* Modal toggle button */}
            <button
                onClick={toggleModal}
                className="bg-orange-600 hover:bg-orange-100 px-8 py-4 rounded-lg  border-black font-bold"
                type="button"
            >
                Add another admin
            </button>

            {/* Main modal */}
            {isOpen && (
                <div
          className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative p-4 w-full max-w-md max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-orange-50 rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 border-b rounded-t bg-yellow-500">
                <h3 className="text-xl font-semibold text-white">
                  Register
                </h3>
                <button
                  type="button"
                  className="text-white bg-transparent hover:bg-yellow-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Enter Name"
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.name && <p className='text-red-600 font-light'>{errors.name}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-semibold mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Enter Email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.email && <p className='text-red-600 font-light'>{errors.email}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-semibold mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Enter Password"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.password && <p className='text-red-600 font-light'>{errors.password}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminModal;
