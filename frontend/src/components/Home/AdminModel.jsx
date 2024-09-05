import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminModal = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("admin");
        const navigate = useNavigate();
      
        const handleSubmit = (e) => {
           e.preventDefault();
           axios.post("http://localhost:5555/register", { name, email, password,role })
             .then(result => {
               console.log(result);
               toggleModal()
             })
             .catch(err => console.log(err));
         };
      

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Modal toggle button */}
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                      placeholder="Enter Name"
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
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
                      placeholder="Enter Email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
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
                      placeholder="Enter Password"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
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
