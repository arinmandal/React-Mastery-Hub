import UserContextProvider from "./Context/UserContextProvider";
import Login from "./Components/Login";
import Card from "./Components/Card";
const App = () => {
  return (
  <div className="w-full h-screen flex justify-center align-middle">
  <div className="flex gap-2 my-auto">
    <UserContextProvider >  
        <Login />
        <Card />
      </UserContextProvider>
    </div>

    </div>
    
  );
};

export default App;
