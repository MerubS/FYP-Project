import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
import { useRef,useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Countdown from 'react-countdown';
import axios from "axios";
import { Box } from "@mui/system";
import AlertDialog from "../../Components/DialogueBox/AlertDialogue";
import socketio from "socket.io-client";
import Webcam from 'react-webcam';

const Test = () => {


  const interval_ms = 3000;
  const navigate = useNavigate();
  const candidate = JSON.parse(localStorage.getItem('Candidatedetails'));
  const test = JSON.parse(localStorage.getItem('Testdetails'));
  const [question,setquestions] = useState('');
  const [loading , setloading] = useState(false);
  const [answers,setanswers] = useState([]);
  const [timelimit , settimelimit] = useState('');
  const [open,setopen] = useState(false);
  const [end , setend] = useState('');
  const [disable , setdisable] = useState(timelimit === 0 ? true : false)
  const [invigilance , setinvigilance] = useState({face:0 , gaze:0 , object:0})

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 550,
    height: 550,
    facingMode: "user"
  };
  const socket = socketio("http://127.0.0.1:9000", {
    autoConnect: false,
  });  

  const   sendData = async (data) => {

    console.log('send data : ', end)  
      socket.emit("identification", {
       id: candidate.cnic,
       data: data,
       message : end
     });

   };
    

   socket.on("SEND_LIVE_STREAM", async(identification_result , gaze_result , inference_result , message) => {
        // console.log("Result : ",result) 
        if (message === 'ACKNOWLEDGE') {
          setend('ACKNOWLEDGE');
          socket.disconnect()
          setinvigilance({face:identification_result , gaze:gaze_result , object:inference_result})
        }

        await axios.post('http://localhost:5000/api/candidate/SaveCandidateLogs',{identification_result , gaze_result , inference_result}).then((response)=>{
            console.log(response.data.message);                         // get a message of stream ended then generate report
        })
        // console.log('ABCD')    
        let im = webcamRef.current.getScreenshot();
        im = im.substring(23, im.length);
        // socket.emit("identification" , picture) 
        await sendData(im)
        
        // console.log(result1)
       });

      
  const startStream = () => {
    socket.connect();
    console.log('StartSTREAM : ', end)  
        let im = webcamRef.current.getScreenshot();
        im = im.substring(23, im.length);
        socket.emit("identification" , {
          data: im,
          id: candidate.cnic,
          message: end                              // assign state
        })
   
  }



 /////////////////////////// Streaming

  useEffect(() =>{

  socket.connect();       ///////// connect to socket
  
  console.log("PAGE STARTED");
  

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
    // capture();          ///////// capture
 })
},[]);

useEffect(()=>{
  if (timelimit !== '' && question!== '') {
    setloading(true);
  }
  
},[timelimit,question]);


useEffect(()=>{
  if (end === 'ACKNOWLEDGE') {
     try {
    axios.post('http://localhost:5000/api/report/UpdateReport', {question , answers , testid:test.test_id , canid:candidate.cnic , per_face:invigilance.face , per_object:invigilance.object , per_gaze:invigilance.gaze}  )
    .then((response)=>{
      console.log(response.data.message);
      navigate('/thankyou');
    });
   }
   catch (error) {
       console.log(error.response);
   }
  }
},[end]);

const submitHandler = async () => {
  
  console.log(answers)
  setend('TEST ENDED')
  // try {
  //   axios.post('http://localhost:5000/api/report/UpdateReport', {question , answers , testid:test.test_id , canid:candidate.cnic}  )
  //   .then((response)=>{
  //     console.log(response.data.message);
  //     navigate('/thankyou');
  //   });
  //  }
  //  catch (error) {
  //      console.log(error.response);
  //  }
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
        <Webcam audio={false}  height={300} ref={webcamRef} screenshotFormat="image/jpeg" width={300} videoConstraints={videoConstraints}/>
        {open && <AlertDialog open={open} setopen={()=>{setopen(false)}} submit={()=>{submitHandler()}} timeup={disable}/>}
        <Grid container justifyContent="center" sx={{padding:'30px'}} >
        <button onClick={startStream}/>
         {loading && <Countdown date={Date.now()+3000000} renderer={renderer} /> }
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