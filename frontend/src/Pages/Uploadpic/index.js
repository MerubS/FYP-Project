import { Typography , Grid , Button , Box } from "@mui/material";
import folder from '../../Images/folder.svg';


import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import socketio from "socket.io-client";
import Webcam from 'react-webcam';



////////// UserID will come from node backend after SignUp of student
///////////////////////// Here i will take pictures for model training


const Uploadpic = () => {

   const params = useParams();
   const studentId = "42401802299227";    /////////// Will come from backend
 
   const webcamRef = useRef(null);
   const [picCount, SetPicCount] = useState(0);

   const videoConstraints = {
     width: 550,
     height: 550,
     facingMode: "enviorment"
   };
 
   const socket = socketio("http://127.0.0.1:9000", {
     autoConnect: false,
   });
 
   
 
 
  
 
   useEffect(() => {
     
      socket.connect();

   }, []);

   const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
 
 
   const sendData = (data) => {
     socket.emit("register_user", {
       id: studentId,
       data: data,
     });
   };
 
   // const startConnection = () => {
  
   //       console.log("Local Stream found");
 
   //       // socket.connect();
   //       // socket.emit("join", { username: localUsername, room: roomName });
 
   //       const interval = setInterval(() => {
             
   //       let im = webcamRef.current.getScreenshot();
   //       im = im.substring(23, im.length);
   //       // sendData(im)
   //       console.log("hello")
   //       }, 1000/30);
 
   // };
 
 
   const capture = async () => {
      
      let pictures = [];
 
      for (let i = 0; i < 30 ; i++){
         
         let im = webcamRef.current.getScreenshot();
         im = im.substring(23, im.length);
         SetPicCount(i+1)
         pictures.push(im)
         sendData(im)
         await sleep(1000);
         
      }

      socket.disconnect();

   }



   return (



      <div>
      {/* <label>{"Username: " + localUsername}</label>
      <label>{"Room Id: " + roomName}</label> */}
      {/* <video autoPlay muted playsInline ref={localVideoRef} /> */}

      <h1>
         Time to take picture for registration
      </h1>

      <h1>
         {picCount}
      </h1>
      <div className="webcam-img">

                <Webcam

                audio={false}

                height={550}

                ref={webcamRef}

                screenshotFormat="image/jpeg"

                width={550}

                videoConstraints={videoConstraints}

                />

                </div>
      <div>
        <button label="press to start" onClick={capture}>Press</button>
      </div>
    </div>







      // <Grid container justifyContent="center" alignItems="center" style={{background: 'linear-gradient(#FFFFFF,#02386E)',height:'100vh'}}>
      //    <Grid alignItems="center" style={{height:'30vh' , width:'70vh',borderRadius: '0.5rem' , padding:"25px", borderStyle:'dashed', borderColor:'white' }}>
      //        <img src={folder} style={{ height: '4rem' , width: '4rem' , margin:'auto' , display:'block' }}/>
      //        <Typography align="center">
      //           Drag your picture here to start uploading.
      //        </Typography>
      //        <Typography align="center" style={{color:'grey'}}> ------------ OR ----------- </Typography>
      //        <Box align="center" style={{padding:'10px'}}>
      //        <Button variant="contained" style={{color:'white' , background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)' , margin:'auto'}} > Browse Files </Button>
      //        </Box>
      //    </Grid>
      // </Grid>
   );
} 

export default Uploadpic;