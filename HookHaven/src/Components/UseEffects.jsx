import React, { useState, useEffect } from 'react';

const UseEffects = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  // useEffect with cleanup (window resize listener)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <section className="border-2 border-gray-300 p-4 w-full max-w-md mx-2">
        <section>
          <h2 className="text-xl text-blue-500 font-bold text-center">useEffect</h2>
          <p className="text-center">useEffect lets you perform side effects in functional components.</p>
          {/* <div className="flex justify-center gap-2 mt-2">
            <button className="bg-blue-500 text-white px-2 py-1 text-center" onClick={() => setCount(count + 1)}>Increment</button>
          </div> */}
          {/* <p className="text-center mt-2">Check your browser title - it updates with the count!</p> */}
        </section>
        <section className="mt-4">
          <h2 className="text-xl text-blue-500 font-bold text-center">useEffect with Cleanup</h2>
          <p className="text-center">Current window width: {windowWidth}px</p>
          <p className="text-center mt-2">Resize your browser window to see this update</p>
        </section>
      </section>
    </>
  );
};

export default UseEffects;