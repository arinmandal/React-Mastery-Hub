
import { useParams } from "react-router-dom";
const User = () => {
  const {userId
} = useParams();
  return <div className="bg-blue-500 p-4 font-bold text-center text-2xl">User : {userId}</div>;
};

export default User;
