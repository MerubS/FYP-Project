import Dashboard from "./Pages/Dashboard"
import NavBar from "./Components/Navbar"
import Footer from "./Components/Footer"
import TabPanel from "./Pages/BasicTabs"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Uploadpic from "./Pages/Uploadpic"
import Test from "./Pages/Test"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { useState , useEffect } from "react"

function App() {
 
  return (
   <>
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<TabPanel />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Test/>}/>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
