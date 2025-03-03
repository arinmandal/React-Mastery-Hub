import React from 'react';
import { useState } from 'react';

const UseState = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <section className="border-2 border-gray-300 p-4 w-full max-w-md mx-2">
        <section>
          <h2 className="text-xl text-blue-500 font-bold text-center">useState</h2>
          <p className="text-center">useState is a Hook that allows you to have state variables in functional components.</p>
          <p className="text-center">Count: {count}</p>
          <div className="flex justify-center gap-2 mt-2">
            <button className="bg-blue-500 text-white px-2 py-1 text-center" onClick={() => setCount(count + 1)}>Increment</button>
            <button className="bg-red-500 text-white px-2 py-1 text-center" onClick={() => setCount(count - 1)}>Decrement</button>
          </div>
        </section>
        <section className="mt-4">
          <h2 className="text-xl text-blue-500 font-bold text-center">useState with Controlled Input</h2>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="border-2 border-gray-300 p-1 w-full my-2"
            placeholder="Enter Name"
          />
          <p>You typed: {inputValue}</p>
        </section>
      </section>
    </>
  );
};

export default UseState;