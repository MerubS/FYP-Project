import { Typography , TextField , Button , Box , Grid , Snackbar , Alert} from '@mui/material';
import examiner from '../../Images/examiner.svg';
import examinee from '../../Images/examinee.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { internal_processStyles } from '@mui/styled-engine';

const Register = () => {
    const [registerdata , setregisterdata] = useState({cnic:0 , name: '' , email: '' , contact: '' , dob:'' , city:'' , gender:''});
    const [errors , seterrors] = useState({cnic:'' , email: '' , contact: '' , dob:''}) 
    const [disable , setdisable] = useState(false);

    const onSubmit = async () => {
       if (registerdata.city!=='' && registerdata.cnic!=='' && registerdata.contact!='' && registerdata.dob!='' && registerdata.email!=''
       && registerdata.gender!='' && registerdata.name!='') {
        console.log("Send");
       try {
        const resp = await axios.post('http://localhost:5000/api/insertcandidate',registerdata);
        console.log(resp.data.message);
        // Push route to the test page
       }
       catch (error) {
           console.log(error.response);
       }
    }
    else {
        console.log("Incomplete");
    }

}

    useEffect(() => {
     console.log(typeof registerdata.cnic);
  
      }, [registerdata]);
    const changehandler = (event) => {
        console.log(event.target.id)
        console.log(errors)
       switch (event.target.id) {
        case 'email':
            if (!/\S+@\S+\.\S+/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    email : "Invalid email"
                }))
            setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    email : ''
                }))
            setdisable(false)
            }
        break;
        case 'contact':
            if (!/^\d{11}$/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    contact : "Invalid phone number"
                }))
                setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    contact : ''
                }))
                setdisable(false)
            }
        break;
        case 'dob':
            if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    dob : "Proper Format YYYY-MM-DD"
                }))
                setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    dob : ''
                }))
                setdisable(false)
            }
        break;
        case 'cnic':
            if (!/^[0-9+]{5}[0-9+]{7}[0-9]{1}$/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    cnic : "Proper Format XXXXXXXXXXXXX"
                }))
                setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    cnic : ''
                }))
                setdisable(false)
            }
        break;
       }
       setregisterdata(prevstate => ({
        ...prevstate,
        [event.target.id] : event.target.value
       }))
      
    }
 return (
    <Grid container alignItems="center" justifyContent='center' style={{ padding:'50px'}}>
    <Grid item xs={6} style={{display:'grid', textAlign:'center' , paddingBottom:'10px' , paddingTop:'50px'}}>
     <Typography variant='h6'> Welcome to Smart Invigilance Tool ! </Typography>
     <Typography> Register to start your test </Typography>
     <Grid container alignItems="center" justifyContent='center' style={{marginBottom:'25px'}}>
        <Box style={{marginRight:'15px' , textAlign:'center' }}>
            <img src={examiner} style={{ height: '10rem' , width: '7rem' ,display:'block'  , borderRadius:'100px'}}/>
            <Button onClick={()=>{
                setregisterdata(prevState=>({
                    ...prevState,
                    gender: 'F'
                }))
            }}> Female </Button>
        </Box>
        <Box style={{marginRight:'15px' , textAlign:'center'}}>
        <img src={examinee} style={{ height: '10rem' , width: '7rem' , display:'block' , borderRadius:'100px'}}/>
            <Button onClick={()=>{
                setregisterdata(prevState=>({
                    ...prevState,
                    gender: 'M'
                }))
            }}> Male </Button>
        </Box>
     </Grid>
     <TextField id="cnic" label="CNIC" error={errors.cnic} helperText={errors.cnic} variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="name" label="Name" variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="email" error={errors.email} helperText={errors.email} label="Email Address" variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="contact" label="Phone Contact" error={errors.contact} helperText={errors.contact} variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="dob" label="Date of Birth" error={errors.dob} helperText={errors.dob} variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="city" label="City" variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <Button variant="contained" onClick={onSubmit} disabled={disable} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', marginBottom:'5px'}}> Register </Button>
     <Grid container alignItems="center" justifyContent='center' style={{marginBottom:'25px'}}>
     <Typography> Your test will start in:  </Typography>
     <Button> <u> Timer </u> </Button>
     </Grid>
     </Grid>
    </Grid>
 );
}

export default Register;