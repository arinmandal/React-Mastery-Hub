import React from "react";
import GlobalContext from "./GlobalContext";
import { useState } from "react";
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default UserContextProvider;
