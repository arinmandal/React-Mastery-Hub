import { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
const Card = () => {
  const { user } = useContext(GlobalContext);

  return (
    <>
      {!user ? (
        <div className='w-80 bg-gray-900 h-96 margin-auto py-2 px-4 rounded-md'>
          <h2 className='text-center text-red-600 text-2xl'>Please Login</h2>
        </div>
      ) : (
        <div className='w-96 bg-cyan-700 h-96 margin-auto  py-2 px-4 rounded-md'>
          <p>Hello : {user.name}</p>
          <p>Your password is too easy : {user.password}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
        </div>
      )}
    </>
  );
};

export default Card;
