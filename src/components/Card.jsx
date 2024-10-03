import React from 'react'

function Card(props) {
    const {name, price, description} = props.product;
    const {id, handleDelete} = props;
    
  return (
    <div className='w-1/4 p-3 border rounded-md bg-blue-300'>
        <h2>{name}</h2>
        <h2>{price}</h2>
        <h2>{description}</h2>

        <button onClick= {() => {handleDelete(id)}} className='bg-red-500 py-3 px-3 text-white cursor-pointer rounded-md'>delete</button>
    </div>
  )
}

export default Card;