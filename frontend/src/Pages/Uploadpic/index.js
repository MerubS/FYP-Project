import { Typography , Grid , Button , Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import socketio from "socket.io-client";
import Webcam from 'react-webcam';
import { useNavigate } from "react-router-dom";



import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import socketio from "socket.io-client";
import Webcam from 'react-webcam';



////////// UserID will come from node backend after SignUp of student
///////////////////////// Here i will take pictures for model training


const Uploadpic = () => {

<<<<<<< HEAD

   const params = useParams();
   const studentId = "42401802299227";    /////////// Will come from backend
   const navigate = useNavigate();
=======
   const params = useParams();
   const studentId = "42401802299227";    /////////// Will come from backend
 
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
   const webcamRef = useRef(null);
   const [picCount, SetPicCount] = useState(0);

   const videoConstraints = {
     width: 550,
     height: 550,
<<<<<<< HEAD
     facingMode: "user"
=======
     facingMode: "enviorment"
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
   };
 
   const socket = socketio("http://127.0.0.1:9000", {
     autoConnect: false,
<<<<<<< HEAD
   });  
=======
   });
 
   
 
 
  
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
 
   useEffect(() => {
     
      socket.connect();

   }, []);

   const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
 
 
<<<<<<< HEAD
   const sendData = async (data) => {
    await socket.emit("register_user", {
=======
   const sendData = (data) => {
     socket.emit("register_user", {
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
       id: studentId,
       data: data,
     });
   };
<<<<<<< HEAD

=======
 
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
 
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
 
   const capture = async () => {
      
      let pictures = [];
 
      for (let i = 0; i < 30 ; i++){
         
         let im = webcamRef.current.getScreenshot();
         im = im.substring(23, im.length);
         SetPicCount(i+1)
         pictures.push(im)
<<<<<<< HEAD
        await sendData(im)
=======
         sendData(im)
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
         await sleep(1000);
         
      }

      socket.disconnect();
<<<<<<< HEAD
      navigate('/test');
=======
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca

   }



   return (

<<<<<<< HEAD
<>
      <Grid container justifyContent="center" alignItems="center" style={{background: 'linear-gradient(#FFFFFF,#02386E)',height:'100vh'}}>
         <Grid alignItems="center" style={{ width:'70vh',borderRadius: '0.5rem' , padding:"25px", borderStyle:'dashed', borderColor:'white' }}>
         <Typography align="center" variant="h6"> Capture Picture </Typography>
         <Typography align="center" sx={{color:'grey'}}> Please capture picture to complete the registration </Typography>
         <Typography align="center" sx={{color:'grey'}}> Wait Time : {30 - picCount} </Typography>
         <Box align="center" style={{padding:'10px'}}>
         <Webcam audio={false}  height={300} ref={webcamRef} screenshotFormat="image/jpeg" width={300} videoConstraints={videoConstraints}/>
          </Box>   
             <Box align="center" style={{padding:'10px'}}>
             <Button variant="contained" onClick={capture} style={{color:'white' , background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)' , margin:'auto'}} > Take Picture  </Button>
             </Box>
         </Grid>
      </Grid>
      </>
=======


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
>>>>>>> 7f6aeae550ee8d06810526bd786cfc0b61ff7fca
   );
} 

export default Uploadpic;