import React from 'react'
import { FaCircle } from "react-icons/fa";

const Card = ({ticket,user}) => {
  return (
    <div className='flex flex-col justify-around rounded-lg m-2 w-full p-4 shadow-lg shadow-slate-300 bg-white'>
        <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-500'>
                {ticket.id}
            </div>
            <div className='text-gray-600'>{user[0].name}</div>
        </div>
        <h2 className='text-md font-semibold leading-4 m-2'>
            {ticket.title}
        </h2>
        <div className='border-gray-400 border-2 w-fit p-0.5 rounded-lg text-[0.87rem] text-gray-600 flex items-center gap-1'>
            <FaCircle />
            <p >{ticket.tag[0]}</p>
        </div>
    </div>
  )
}

export default Card;