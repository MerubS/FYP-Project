import Dashboard from "./Pages/Dashboard"
import NavBar from "./Components/Navbar"
import Footer from "./Components/Footer"
import TabPanel from "./Pages/BasicTabs"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Uploadpic from "./Pages/Uploadpic"
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Uploadpic/> */}
      <NavBar/>
      <Home/>
      <Login/>
      <Signup/>
      <TabPanel/>
      <Footer/>
    </div>
  );
}

export default App;
