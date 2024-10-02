import React, { useState, useEffect, useRef } from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://auth-rg69.onrender.com/api/products/private/all')
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Maxsulotlarni olishda xatolik:', error);
      });
  };

  const createProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: nameRef.current.value,
      price: priceRef.current.value
    };
    fetch('https://auth-rg69.onrender.com/api/products/private', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .then(() => {
        nameRef.current.value = '';
        priceRef.current.value = '';
        fetchProducts();
      })
      .catch(error => {
        console.error('Maxsulot yaratishda xatolik:', error);
      });
  };

  const deleteProduct = (id) => {
    fetch(`https://auth-rg69.onrender.com/api/products/private/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          fetchProducts();
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Maxsulotni o\'chirishda xatolik:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Maxsulotlar</h1>
      
      <form onSubmit={createProduct} className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Nomi"
          ref={nameRef}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Narxi"
          ref={priceRef}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Qo'shish
        </button>
      </form>

      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between items-center bg-white p-4 rounded-md shadow">
            <span className="text-gray-800">{product.name} - {product.price}</span>
            <button 
              onClick={() => deleteProduct(product._id)} 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              O'chirish
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;