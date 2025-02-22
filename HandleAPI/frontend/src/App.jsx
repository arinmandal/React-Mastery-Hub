import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [search, setSearch] = useState('');
  // const { products, error, loading } = customReactQuery('/api/products?search=' + search);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // Automactically cancel the previous request
    let controller = new AbortController();
    // IIFE (Immediately Invoked Function Expression)
    ; (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if(axios.isCancel(error)) {
          console.log('Request canceled', error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })()

    // cleanup function
    return () => {
      controller.abort();
    }

  }, [search])

  return (
    <div className='flex justify-center items-center h-screen flex-col bg-gray-300'>
      <h1 className='text-center text-3xl font-bold'>Master React API</h1>

      <input type="text" placeholder='Search'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='border-2 border-gray-800 p-2 rounded-lg'
      />

      {loading && <h1 className='text-2xl'>Loading ...</h1>}
      {error && <h1 className='text-2xl text-red-500'>Error while fetching data</h1>}
      <h2 className='font-bold text-2xl text-center mt-5'>All Products are :{products.length}</h2>
    </div>
  )
}

export default App

const customReactQuery = (urlPath) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // IIFE (Immediately Invoked Function Expression)
    ; (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(urlPath);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })()


  }, [search])

  return { products, error, loading }
}