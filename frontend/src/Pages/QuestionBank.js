import DTable from "../Components/Table"
import { Grid , Box, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import Add from '../Icons/add.svg';
import QuestionDialogue from "../Components/QuestionDialogue";
import { useState } from "react";

const QuestionBank = () => {
    const [open , setOpen] = useState(false);
    return(
       <Grid>
        <QuestionDialogue open={open}/>
       <DTable heading= {['Question', 'Difficulty', 'Time', 'Option']}/>
        <Grid container alignItems="left" justifyContent='left' style={{marginBottom:'25px'}}>
        <Fab color="primary" aria-label="add" onClick={()=>{setOpen(true)}}> 
        <img src={Add} style={{ height: '1.5rem' , width: '1.5rem' , padding:5}} alt="tickmark"/>
        </Fab>
        <Typography style={{paddingTop:'15px' , paddingLeft:'8px'}}> Create Question </Typography>
        </Grid>
    </Grid>

    );
}

export default QuestionBank;