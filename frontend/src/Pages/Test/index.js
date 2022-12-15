import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Countdown from 'react-countdown';
import axios from "axios";
import { Box } from "@mui/system";

const Test = () => {
  const [question,setquestions] = useState();
  const [loading , setloading] = useState(false);

 useEffect(()=>{
  axios.get('/api/getQuestionbyTestid',{params:{id : '1'}})
  .then(function (response) {
    setquestions(response.data.recordset);
    setloading(true);
 })
},[]);

useEffect(()=>{
  console.log(question)
},[question]);

const Completionist = () => <span> Times up !</span>;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return <span style={{fontsize:'50px', fontweight:'bold'}}>{hours}:{minutes}:{seconds}</span>;
  }
};

  return (
    <Grid container justifyContent="Center" sx={{padding:'30px'}}>
        <Grid container justifyContent="center" sx={{padding:'30px'}} >
          <Countdown date={Date.now() + 5000} renderer={renderer} />
        </Grid>
        <Grid container sx={{borderRadius:10,padding:'50px',borderStyle:'solid',borderImage:'linear-gradient(to right bottom, #00264D, #02386E , #00498D) 1',borderWidth:'5px'}}>
        <Grid  item xs={12}>
        <Box style={{display:'block'}}>
        <span style={{display:'block'}}> Name: First Last  </span>
        <span style={{display:'block'}}> Questions: No.of Questions</span>
        <span style={{display:'block'}}> Timelimit: time</span>
        </Box>
        </Grid>
        <Grid item xs={12}>
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
         <Grid container justifyContent='center'>
         <Button variant="contained" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'2px'}}> Submit </Button>
         </Grid>
        </Grid>
    </Grid>
);
}

export default Test;