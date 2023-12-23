import React from 'react'

const Card = ({id,title,status,userId,priority,tag}) => {
  return (
    <div className='flex flex-col justify-around border-black border-2 m-4 w-[20%]'>
        <div className='flex justify-between'>
            <div>
                {id}
            </div>
            <div>{userId}</div>
        </div>
        <h2>
            {title}
        </h2>
        <p>{tag[0]}</p>
    </div>
  )
}

export default Card;