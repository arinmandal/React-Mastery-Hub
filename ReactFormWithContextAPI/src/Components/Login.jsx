import React, { useContext, useState } from "react";
import GlobalContext from "../Context/GlobalContext";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { setUser } = useContext(GlobalContext);

  const handleSubmit = e => {
    e.preventDefault();
    setUser({ name, password, email, address });
  };
  return (
    <div className='w-80 bg-cyan-700 h-96 margin-auto flex flex-col justify-around py-2 px-4 rounded-md'>
      <input
        className='p-2 rounded-md'
        type='text'
        placeholder='Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='p-2 rounded-md'
        type='text'
        placeholder='Password'
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='p-2 rounded-md'
        type='email'
        placeholder='Email'
      />
      <textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        className='p-2 rounded-md'
        type='text'
        placeholder='Write your address here...'
      />

      <button onClick={handleSubmit} className='p-2 bg-teal-800 rounded-md hover:bg-slate-400 hover:text-zinc-300'>
        Submit
      </button>
    </div>
  );
};

export default Login;
