import { Typography , TextField , Button , Box , Grid} from '@mui/material';
import examiner from '../Images/examiner.svg';
import examinee from '../Images/examinee.svg';
const Signup = () => {
 return (
    <Grid container alignItems="center" justifyContent='center' style={{ padding:'50px'}}>
    <Grid item xs={6} style={{display:'grid', textAlign:'center' , paddingBottom:'10px' , paddingTop:'50px'}}>
     <Typography variant='h6'> Welcome to Smart Invigilance Tool ! </Typography>
     <Typography> Sign up to create your account </Typography>
     <Grid container alignItems="center" justifyContent='center' style={{marginBottom:'25px'}}>
        <Box style={{marginRight:'15px' , textAlign:'center' }}>
            <img src={examiner} style={{ height: '10rem' , width: '7rem' ,display:'block'  , borderRadius:'100px'}}/>
            <Button> Examiner </Button>
        </Box>
        <Box style={{marginRight:'15px' , textAlign:'center'}}>
        <img src={examinee} style={{ height: '10rem' , width: '7rem' , display:'block' , borderRadius:'100px'}}/>
            <Button> Examinee </Button>
        </Box>
     </Grid>
     <TextField id="outlined-basic" label="CNIC" variant="outlined" style={{marginBottom:'20px'}} />
     <TextField id="outlined-basic" label="Email Address" variant="outlined" style={{marginBottom:'20px'}} />
     <TextField id="outlined-basic" label="Telephone" variant="outlined" style={{marginBottom:'20px'}} />
     <TextField id="outlined-basic" label="Password" variant="outlined" style={{marginBottom:'20px'}} />
     <TextField id="outlined-basic" label="Confirm Password" variant="outlined" style={{marginBottom:'20px'}} />
     <Button variant="contained" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'5px'}}> Sign up </Button>
     <Grid container alignItems="center" justifyContent='center' style={{marginBottom:'25px'}}>
     <Typography> Already have account ? </Typography>
     <Button> <u> Sign In </u> </Button>
     </Grid>
     </Grid>
    </Grid>
 );
}

export default Signup;