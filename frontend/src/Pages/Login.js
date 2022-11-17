import { Typography , TextField , Button , Grid} from '@mui/material';
import hi from '../Images/login.svg';
const Login = () => {
 return (
    <Grid container alignItems="center" justifyContent='center' style={{ padding:'50px' , paddingTop:'15px'}}>
        <Grid item xs={6} style={{display:'grid' , textAlign:'center' , padding:'40px'}}>
        <img src={hi} style={{ height: '20rem' , width: '20rem' , margin:'auto' , display:'block' }}/>
        <Typography variant='h6'> Welcome Back to Smart Invigilance Tool ! </Typography>
        <Typography style={{paddingBottom:'20px'}}> Enter details to login. </Typography>
        <TextField id="outlined-basic" label="CNIC" variant="outlined" style={{marginBottom:'20px'}} />
        <TextField id="outlined-basic" label="Password" variant="outlined" style={{marginBottom:'20px'}} />
        <Button variant="contained" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'5px'}}> Sign in </Button>
        <Grid container alignItems="center" justifyContent='center'>
     <Typography> Create account? </Typography>
     <Button> <u> Sign Up </u> </Button>
     </Grid>
     <Button> Forgot Password? </Button>
        </Grid>
    </Grid>
 )
}

export default Login;