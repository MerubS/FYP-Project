import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [question,setquestions] = useState();
  const [loading , setloading] = useState(false);
 useEffect(()=>{
  axios.get('/api/retrievequestions')
  .then(function (response) {
    setquestions(response.data.recordset);
    setloading(true);
 })
},[]);

useEffect(()=>{
  console.log(question)
},[question]);
  return (
    <Grid container justifyContent="Center" sx={{padding:'30px'}}>
        <Grid container justifyContent="center" >
             <p> Timer </p>
        </Grid>
        <Grid container sx={{borderRadius:10, height:'100vh',padding:'50px',borderStyle:'solid',borderImage:'linear-gradient(to right bottom, #00264D, #02386E , #00498D) 1',borderWidth:'5px'}}>
        <Grid container>
        <p> Name: First Last "\n" </p>
        <p> Questions: No.of Questions</p>
        <p> Timelimit: time</p>
        </Grid>
        <form>
    {loading && question.map((q)=>{
      return (
      <FormControl sx={{display:'block', margin:'40px'}} variant="standard">
        <FormLabel>{q.question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          // value={value}
          // onChange={handleRadioChange}
        >
          <FormControlLabel value="best" control={<Radio />} label={q.options} />
          <FormControlLabel value="worst" control={<Radio />} label={q.options} />
        </RadioGroup>
        {/* <FormHelperText>{helperText}</FormHelperText> */}
      </FormControl>
      )
    })}
         </form> 
        </Grid>
        <Button variant="contained" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'5px'}}> Submit </Button>
    </Grid>
);
}

export default Test;