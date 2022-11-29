import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
const Test = () => {
return (
    <Grid container justifyContent="Center" sx={{padding:'30px'}}>
        <Grid container justifyContent="center" >
             <p> Timer </p>
        </Grid>
        <Grid container sx={{borderRadius:10, height:'100vh',padding:'50px',borderStyle:'solid',borderImage:'linear-gradient(to right bottom, #00264D, #02386E , #00498D) 1',borderWidth:'5px'}}>
        <p> Name: First Last "\n" </p>
        <p> Questions: No.of Questions</p>
        <p> Timelimit: time</p>
        
        <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
</FormControl>
        </Grid>
        <Button variant="contained" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'5px'}}> Submit </Button>
    </Grid>
);
}

export default Test;