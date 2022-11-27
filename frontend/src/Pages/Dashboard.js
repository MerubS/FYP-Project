import { Grid , Typography} from "@mui/material";
import OngoingExam from "../Components/OngoingExam";
import Exammanager from "../Components/Exammanager";
import Fab from '@mui/material/Fab';
import Add from '../Icons/add.svg';
import Createtest from "../Components/DialogueBox/CreateTest";
import { useState } from "react";

const Dashboard = () => {
  const [open , setOpen] = useState(false);
 return (
   <Grid container spacing={3}>
   <Grid item xs={6}>
     <OngoingExam/>
   </Grid>
   <Grid item xs={6}>
     <Exammanager/>
   </Grid>
   <Grid item xs={3}>
   {open && <Createtest open={open}/>}
   </Grid>
   <Grid container alignItems="left" justifyContent='left' style={{margin:'25px'}}>
        <Fab color="primary" aria-label="add" onClick={()=>{setOpen(true)}}> 
        <img src={Add} style={{ height: '1.5rem' , width: '1.5rem' , padding:5}} alt="tickmark"/>
        </Fab>
        <Typography style={{paddingTop:'15px' , paddingLeft:'8px'}}> Create Test</Typography>
    </Grid>
   </Grid>
 );
}

export default Dashboard;