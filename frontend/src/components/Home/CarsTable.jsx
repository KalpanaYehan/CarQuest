import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';

const CarsTable = ({ cars }) => {

  const{user} =useContext(AuthContext)
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white">
            <th className="border border-orange-600 rounded-md p-2">No</th>
            <th className="border border-orange-600 rounded-md p-2">Model</th>
            <th className="border border-orange-600 rounded-md p-2 max-md:hidden">Brand</th>
            <th className="border border-orange-600 rounded-md p-2 max-md:hidden">Publish Year</th>
            <th className="border border-orange-600 rounded-md p-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car._id} className="h-12 bg-white hover:bg-orange-100 transition-colors duration-200">
              <td className="border border-orange-700 rounded-md text-center p-2">{index + 1}</td>
              <td className="border border-orange-700 rounded-md text-center p-2">{car.model}</td>
              <td className="border border-orange-700 rounded-md text-center p-2 max-md:hidden">{car.brand}</td>
              <td className="border border-orange-700 rounded-md text-center p-2 max-md:hidden">{car.publishYear}</td>
              <td className="border border-orange-700 rounded-md text-center p-2">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/cars/details/${car._id}`} className="text-2xl text-green-800 hover:text-green-600 transition-colors duration-200">
                    <BsInfoCircle />
                  </Link>
                  {user && user.role === 'admin' && (
                      <>
                        <Link to={`/cars/edit/${car._id}`} className="text-2xl text-yellow-700 hover:text-yellow-500 transition-colors duration-200">
                            <AiOutlineEdit />
                        </Link>
                        <Link to={`/cars/delete/${car._id}`} className="text-2xl text-red-600 hover:text-red-400 transition-colors duration-200">
                            <MdOutlineDelete />
                        </Link>
                      </>
                    )}
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsTable;
