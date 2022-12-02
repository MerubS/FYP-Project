import { Grid , Box, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import Add from '../../Icons/add.svg';
import CreateQuestion from "../../Components/DialogueBox/CreateQuestion";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { useState ,useEffect} from "react";

const QuestionBank = () => {
    const [open , setOpen] = useState(false);
    const [rows,setrows] = useState([]);
    useEffect(() => {
      axios.get('/api/retrievequestions')
    .then(function (response) {
      setrows(response.data.recordset);
    })
    
        }, []);
    const columns = [
        { field: 'question', headerName: 'Question', width: 300 },
        { field: 'difficulty', headerName: 'Difficulty', width: 130 },
      ];
    return(
       <Grid>
        <CreateQuestion open={open} setopen={()=>{setOpen(false)}}/>
       <Grid container sx={{height:'70vh',marginTop:3, marginBottom:3}}>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     getRowId = {rows.test_id + rows.candidate_id}
     checkboxSelection 
      />
   </Grid>
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