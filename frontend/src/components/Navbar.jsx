import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div id="navbar" className="w-full px-4 absolute z-30 bg-yellow-500/25">
      <div className="flex  justify-between py-3">
        <Link to="/" className="flex items-center mb-3 mb-md-0 me-md-auto text-gray-800 no-underline">
          
          <span  className="text-4xl  text-yellow-500 pl-28 font-extrabold">CarQuest</span>
        </Link>

        <ul className="flex gap-10 mr-36">
          <li className="cursor-pointer"><a href="#about" className="text-white  hover:text-orange-500 font-bold text-2xl">About</a></li>
          <li className="cursor-pointer"><a href="#service" className="text-white hover:text-orange-500 font-bold text-2xl">Services</a></li>
          <li className="cursor-pointer"><a href="#contact" className="text-white hover:text-orange-500 font-bold text-2xl">Contact</a></li>

              <Link to='/login'>
                <button
                  className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-600"
                  type="button"
                >
                  Login
                </button>
              </Link>

              <Link to='/signup'>
                <button
                  className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-600"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
          
          
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
