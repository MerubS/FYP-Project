import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
import BasicTabs from './BasicTabs';
function App() {
  return (
    <div>
  <Navbar/>
  <BasicTabs/>
  {/* <Home/> */}
  {/* <Signup/> */}
  {/* <Login/> */}
  <Footer/>
    </div>
  );
}

export default App;
