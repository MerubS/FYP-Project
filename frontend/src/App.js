
import TabPanel from "./Pages/BasicTabs"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Test from "./Pages/Test"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Thankyou from "./Pages/Thankyou";
import Uploadpic from "./Pages/Uploadpic";


function App() {
 
  return (
   <>
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<TabPanel />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/upload" element={<Uploadpic/>}/>
            <Route path="/thankyou" element={<Thankyou/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
