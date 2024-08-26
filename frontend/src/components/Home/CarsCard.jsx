import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import CarSingleCard from './CarSingleCard';

const CarsCard = ({cars}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {cars.map((car)=>(
            <CarSingleCard key={car._id} car={car}/>
        )
             
        )}
        </div>
  )
}
export default CarsCard
