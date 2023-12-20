// import { data } from "autoprefixer";
// import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const GitHub = () => {
  const data = useLoaderData();
  // const [data, setData] = useState(0);

  // useEffect(() => {
  //   fetch(`https://api.github.com/users/arinmandal`)
  //     .then(response => response.json())
  //     .then(data => setData(data));
  // }, []);
  return (
    <>
      <div className='w-96 bg-slate-400 my-2 mx-auto rounded-md flex gap-2 align-middle'>
        <img
          className='rounded-full mx-2 my-2'
          src={data.avatar_url}
          alt='Git Profile'
          width={100}
        />
        <div className='text-white font-medium my-2'>
          <h2>{data.name}</h2>
          <h2>{data.location}</h2>
          <h2>{data.emailid}</h2>
          <h2> Github Followers: {data.followers}</h2>
        </div>
      </div>
    </>
  );
};

export default GitHub;

export const gitHubLoaderData = async () => {
  const response = await fetch(`https://api.github.com/users/arinmandal`);
  return response.json();
};
