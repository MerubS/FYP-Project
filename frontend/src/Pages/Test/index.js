import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Countdown from 'react-countdown';
import axios from "axios";
import { Box } from "@mui/system";
import AlertDialog from "../../Components/DialogueBox/AlertDialogue";

const Test = () => {
  const candidate = JSON.parse(localStorage.getItem('Candidatedetails'));
  const test = JSON.parse(localStorage.getItem('Testdetails'));
  const [question,setquestions] = useState('');
  const [loading , setloading] = useState(false);
  const [answers,setanswers] = useState([]);
  const [timelimit , settimelimit] = useState('');
  const [open,setopen] = useState(true);
  const [disable , setdisable] = useState(timelimit === 0 ? true : false)

  useEffect(()=>{
  console.log(test , candidate);
  axios.get('/api/report/getReportbyId',{params:{tid:test.test_id , cid:candidate.cnic}}).then((response)=>{
    console.log(response.data.output)
    let [data] = response.data.output;
    let enddate = new Date(data.end_time);
    let currdate = new Date();
    console.log(enddate.getTime() - currdate.getTime() );
    settimelimit(enddate.getTime() - currdate.getTime() );

  })
  axios.get('/api/question/getQuestionbyTestId',{params:{id : test.test_id}})
  .then(function (response) {
    console.log(response.data.output)
    setquestions(response.data.output);
 })
},[]);

useEffect(()=>{
  if (timelimit !== '' && question!== '') {
    setloading(true);
  }
},[timelimit,question]);


useEffect(()=>{
  console.log(answers)
},[answers]);

const submitHandler = async () => {
  console.log(answers)
  try {
    axios.post('http://localhost:5000/api/report/UpdateReport', {question , answers , testid:test.test_id , canid:candidate.cnic}  )
    .then((response)=>{
      console.log(response.data.message);
    });
   }
   catch (error) {
       console.log(error.response);
   }
}
const changeHandler = (event, qid) => {
  var r = answers.find(item => item.id === qid)
  if (r) {
    let objIndex = answers.findIndex((obj => obj.id == qid));
    answers[objIndex].value = event.target.value

  }
  else {
    setanswers([ 
    ...answers, 
    { value: event.target.value , id: qid} 
  ])
  }
}
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    setdisable(true);
    setopen(true);
  } else {
    return <span style={{fontsize:'50px', fontweight:'bold'}}>{hours}:{minutes}:{seconds}</span>;
  }
};

  return (
    <Grid container justifyContent="Center" sx={{padding:'30px'}}>
        {open && <AlertDialog open={open} setopen={()=>{setopen(false)}} submit={()=>{submitHandler()}} timeup={disable}/>}
        <Grid container justifyContent="center" sx={{padding:'30px'}} >
         {loading && <Countdown date={Date.now() + timelimit} renderer={renderer} /> }
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
    {loading && question.map((q,index)=>{
      let a = q.options.split(',')
      console.log(a)
      return (
      <FormControl sx={{display:'block', margin:'40px'}} variant="standard">
        <FormLabel>{index+1}.  {q.question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          // value={value}
          onChange={(e)=>{changeHandler(e,q.question_id)}}
        >         
        {a.map((o)=>{
          return(
       <FormControlLabel disabled={disable} value={o} control={<Radio />} label={o} />
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
         <Button variant="contained" onClick={()=>{setopen(true)}} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'2px'}} > Submit </Button>
         </Grid>
        </Grid>
    </Grid>
);
}

export default Test;