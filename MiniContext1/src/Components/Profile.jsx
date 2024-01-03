import { useContext } from "react";
import userContext from "../Context/UserContext";
export const Profile = () => {
  const { user } = useContext(userContext);

  if (!user) return <div>Please login</div>;
  return <div>Welcome {user.userName}</div>;
};
