import { useState } from "react";
function App() {
  const [color, setColor] = useState("black");
  return (
    <div
      className='w-full h-screen flex justify-center'
      style={{ backgroundColor: color }}
    >
      <div className='allButtons flex gap-1 bg-black rounded-md p-1 w-[25%] absolute bottom-28 my-0 mx-auto font-bold flex-col'>
        <input
          type='text'
          placeholder='Write your favorite color'
          className='rounded-md py-2 px-2'
          onChange={(e) => setColor(e.target.value)}
        />
        <div className='buttons flex gap-1 justify-evenly flex-wrap'>
          <button
            className='bg-red-500 px-4 rounded-md py-2'
            onClick={() => setColor("red")}
          >
            RED
          </button>
          <button
            className='bg-green-500 px-4 rounded-md py-2'
            onClick={() => setColor("green")}
          >
            GREEN
          </button>
          <button
            className='bg-yellow-500 px-4 rounded-md py-2'
            onClick={() => setColor("yellow")}
          >
            YELLOW
          </button>
          <button
            className='bg-purple-500 px-4 rounded-md py-2'
            onClick={() => setColor("purple")}
          >
            PURPLE
          </button>
          <button
            className='bg-blue-500 px-4 rounded-md py-2'
            onClick={() => setColor("blue")}
          >
            BLUE
          </button>
          <button
            className='bg-orange-500 px-4 rounded-md py-2'
            onClick={() => setColor("orange")}
          >
            ORANGE
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
