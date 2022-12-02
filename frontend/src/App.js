import Dashboard from "./Pages/Dashboard"
import NavBar from "./Components/Navbar"
import Footer from "./Components/Footer"
import TabPanel from "./Pages/BasicTabs"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Uploadpic from "./Pages/Uploadpic"
import Test from "./Pages/Test"
import './App.css';
import { useState , useEffect } from "react"

function App() {
  const [data, setData] = useState(null);
 

  return (
    <div className="App">
      {/* <NavBar/>
      <Home/>
      <Login/> */}
      {/* <Register/> */}
      <Test/>
      <TabPanel/>
      {/* <Footer/> */}
      
    </div>
  );
}

export default App;
