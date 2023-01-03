
import TabPanel from "./Pages/BasicTabs"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Test from "./Pages/Test"
import Uploadpic from "./Pages/Uploadpic"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Thankyou from "./Pages/Thankyou";
import Protectedroute from "./Routes/Protectedroute"
import {Protectedcanroute} from "./Routes/Protectedroute"
import { ContextProvider } from "./Routes/Auth"


function App() {
 
  return (
   <>
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/dashboard" element={<Protectedroute> <TabPanel /> </Protectedroute>} />
          <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Protectedcanroute><Test/> </Protectedcanroute>}/>
            <Route path="/upload" element={ <Protectedcanroute> <Uploadpic/> </Protectedcanroute> }/>
            <Route path="/thankyou" element={ <Thankyou/> }/>
        </Routes>
        </ContextProvider>
      </Router>
      
    </>
  );
}

export default App;
