import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import Useauth from '../Routes/Auth';


const Navbar = () => {
  const authenticate= Useauth();
  const navigate = useNavigate();
  const clickHandler = () => {
    localStorage.clear();
    authenticate.setauth(false);
    navigate('/');
  }
 return (
    <AppBar position="static" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>
      <Toolbar sx={{ display: { xs: "flex" }, flexDirection: "row", justifyContent: "space-between"}}>
        <Typography variant="h6" component="div" > Smart Invigilance Tool </Typography>
        <Box component="span" sx={{display: { md: "flex" }, flexDirection: "row", justifyContent: "space-evenly",}}>
        <Button onClick={clickHandler} style={{color:'white'}}>
        Logout
        </Button>
        </Box>
        
      </Toolbar>
    </AppBar>
 );
}

export default Navbar;