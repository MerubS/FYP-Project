import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Countdown from 'react-countdown';
import axios from "axios";
import { Box } from "@mui/system";

const Test = () => {
  const [question,setquestions] = useState();
  const [loading , setloading] = useState(false);
  const [answers,setanswers] = useState([]);
 useEffect(()=>{
  axios.get('/api/getQuestionbyTestid',{params:{id : '1'}})
  .then(function (response) {
    setquestions(response.data.recordset);
    setloading(true);
 })
},[]);

useEffect(()=>{
  console.log(answers)
});

const Completionist = () => <span> Times up !</span>;
const submitHandler = async () => {
  console.log(answers)
  try {
    const resp = await axios.post('http://localhost:5000/api/generatereport', {question , answers , testid:1 , canid:1}  );
    console.log(resp.data.message);
   }
   catch (error) {
       console.log(error.response);
   }
}
const changeHandler = (event, qid) => {
  var r = answers.find(item => item.id === qid[0])
  if (r) {
    let objIndex = answers.findIndex((obj => obj.id == qid[0]));
    answers[objIndex].value = event.target.value

  }
  else {
    setanswers([ // with a new array
    ...answers, // that contains all the old items
    { value: event.target.value , id: qid[0]} // and one new item at the end
  ])
  }
  console.log(r)
  
  console.log(event.target.value, qid[0])
}
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
      let a = q.options.split(',')
      console.log(a)
      return (
      <FormControl sx={{display:'block', margin:'40px'}} variant="standard">
        <FormLabel>{q.question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          // value={value}
          onChange={(e)=>{changeHandler(e,q.question_id)}}
        >         
        {a.map((o)=>{
          return(
       <FormControlLabel value={o} control={<Radio />} label={o} />
          )
        })}
        </RadioGroup>
        </FormControl>
        )
    }
        
     
      )
    }
         </form> 
         </Grid>
         <Grid container justifyContent='center'>
         <Button variant="contained" onClick={submitHandler} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'2px'}} > Submit </Button>
         </Grid>
        </Grid>
    </Grid>
);
}

export default Test;