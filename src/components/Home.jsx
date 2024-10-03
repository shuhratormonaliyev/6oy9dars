import React, { useEffect, useState, useRef } from 'react';
import Card from '../components/Card';

function Home() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/products/private/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      }
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      setLoading(false); 
    })
    .catch(error => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
  }, [token]);

  function handleDelete(id) {
    let isConfirmed = window.confirm("Rostdan ham o'chirmoqchimisiz?"); 
    if (isConfirmed) {
      fetch(`${import.meta.env.VITE_API_URL}/products/private/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Mahsulot muvaffaqiyatli o'chirildi!") { 
          let copied = [...products];
          copied = copied.filter(cop => cop.id !== id); 
          setProducts(copied);
        }
      })
      .catch(error => {
        console.error("Error deleting product:", error);
      });
    }
  }

  function handleSave(event) {
    event.preventDefault();
    const create = {
      "name": nameRef.current.value,
      "price": priceRef.current.value,
      "description": descriptionRef.current.value,
      "status": "active",
      "category_id": 1 
    };

    fetch(`${import.meta.env.VITE_API_URL}/products/private`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(create)
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        setProducts([...products, data]);
        nameRef.current.value = '';
        priceRef.current.value = '';
        descriptionRef.current.value = '';
      }
    })
    .catch(error => {
      console.error("Error creating product:", error);
    });
  }

  return (
    <div>
      <form className='w-1/3 mt-10 flex flex-col bg-slate-400 p-3 rounded-md gap-4 mx-auto'>
        <input ref={nameRef} className='p-2 rounded-md border' type="text" placeholder='Enter name ...' />
        <input ref={priceRef} className='p-2 rounded-md border' type="number" placeholder='Enter price ...' />
        <textarea ref={descriptionRef} className='p-2 rounded-md border' placeholder='Enter description ...'></textarea>
        <button onClick={handleSave} className='p-2 rounded-md border bg-blue-600 text-white cursor-pointer'>Create</button>
      </form>
      <div className='wrapper container mx-auto mt-10 flex flex-wrap gap-2 justify-center'>
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          products.length > 0 &&
          products.map((product) => (
            <Card key={product.id} product={product} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
