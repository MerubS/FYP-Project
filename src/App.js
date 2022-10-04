import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
function App() {
  return (
    <div>
  <Navbar/>
  {/* <Home/> */}
  {/* <Signup/> */}
  <Login/>
  <Footer/>
    </div>
  );
}

export default App;
