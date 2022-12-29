import { Grid , Box, Typography , Button } from "@mui/material";
import Fab from '@mui/material/Fab';
import Add from '../../Icons/add.svg';
import CreateQuestion from "../../Components/DialogueBox/CreateQuestion";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditQuestion from "../../Components/DialogueBox/EditQuestion";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { useState ,useEffect} from "react";

const QuestionBank = () => {
    const [open , setOpen] = useState(false);
    const [rows,setrows] = useState([]);
    const [currques , setcurrques] = useState();
    const [isEdit , setisEdit] = useState(false);

    useEffect(() => {
      axios.get('/api/retrievequestions')
    .then(function (response) {
      setrows(response.data.recordset);
    })
        }, []);


   const deleteques = () => {
    axios.get('/api/deletequestion',{params:{id:currques.id}})
    .then(function (response) {
      console.log(response.message);                //Check message wont show
    })
        }
        
    const columns = [
        { field: 'question', headerName: 'Question', width: 300 },
        { field: 'difficulty', headerName: 'Difficulty', width: 130 },
      ];
    return(
       <Grid>
        <CreateQuestion open={open} setopen={()=>{setOpen(false)}}/>
       <Grid container sx={{height:'70vh',marginTop:2, marginBottom:6}}>
       <Grid container justifyContent='end' style={{padding:'3px'}}> 
    <Button color="primary" size="medium" onClick={deleteques} startIcon={<DeleteIcon />}> </Button>
    <Button color="primary" size="medium" onClick={()=>{setisEdit(true)}} startIcon={<EditIcon />}> </Button>
     </Grid>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     onRowClick ={(e)=>{setcurrques(e.row)}}
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