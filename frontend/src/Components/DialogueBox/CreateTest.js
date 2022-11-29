import {Dialog, Button , DialogActions , DialogContent , Typography , TextField , DialogTitle, Grid, MenuItem} from '@mui/material';
import { margin } from '@mui/system';
import { useState , useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Createtest = (props) => {
  console.log(props.open)
  const [rows,setrows] = useState([]);
  const [testdata , settestdata] = useState({name:'' , description: '' , nquestions: '' , difficulty: '' , timelimit:'' , unit:''});
  const [errors, seterrors] = useState({nquestions: '' , timelimit:'' });
  const [disable , setdisable] = useState(false);
  useEffect(() => {
      fetch("/api/retrievequestions")
        .then((res) => res.json())
        .then((data) => {setrows(data.recordset)
          console.log("Data", data);});
  
      }, []);
  const columns = [
      { field: 'question', headerName: 'Question', width: 300 },
      { field: 'difficulty', headerName: 'Difficulty', width: 130 },
    ];

    // useEffect(() => {
    //  console.log(testdata);
  
    //   }, [testdata]);

const changehandler = (event) => {
  // console.log(event.target.value);
  // console.log(event.target.id);
  switch (event.target.id) {
    case 'nquestions':
    case 'timelimit':
      if (event.target.value < 0 ) {seterrors(prevState=>({
        ...prevState, 
        [event.target.id] : 'Cannot be negative'
      }))
    setdisable(true)
    }
      else {seterrors(prevState=>({
        ...prevState, 
        [event.target.id] : ''
      }))
    setdisable(false)
  }
    // case 'timelimit':
    //   if (event.target.value < 0 ) {seterrors(prevState=>({
    //     ...prevState, 
    //     [event.target.id] : 'Cannot be negative'
    //   }))}
    //   else {seterrors(prevState=>({
    //     ...prevState, 
    //     [event.target.id] : ''
    //   }))}
  }
       settestdata(prevState=>({
        ...prevState,
        [event.target.id] : event.target.value
       }));
}
return (
<Dialog
        open={props.open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle> Create Test </DialogTitle>
        <DialogContent>
            <form>
        <Grid container justifyContent="space-evenly">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              variant="outlined"
              label="Name"
              type="text"
              onChange={changehandler}
            /> 
        </Grid>    
        <Grid container justifyContent="space-evenly">
            <TextField
              autoFocus
              margin="dense"
              id="description"
              fullWidth
              variant="outlined"
              label= "Description"
              type="text"
              onChange={changehandler}
              multiline
            /> 
        </Grid>
       <Grid container justifyContent="space-evenly">
        <Grid item xs={5}>
        <TextField
              autoFocus
              error={errors.nquestions}
              helperText = {errors.nquestions}
              margin="dense"
              id="nquestions"
              fullWidth
              variant="outlined"
              label= "No.of Questions"
              type="number"
              onChange={changehandler}
            /> 
            <TextField
              autoFocus
              error={errors.timelimit}
              helperText = {errors.timelimit}
              margin="dense"
              id="timelimit"
              fullWidth
              variant="outlined"
              label= "Timelimit"
              type= "number"
              onChange={changehandler}
            />    
        </Grid>
        <Grid item xs={5}>
        <TextField
              autoFocus
              select
              margin="dense"
              id="difficulty"
              fullWidth
              variant="outlined"
              label= "Difficulty"
              onChange={changehandler}
              SelectProps={{
                native: true,
              }}
    
            >
        <option> Easy </option> 
        <option> Medium </option>
        <option> Hard </option>
        </TextField> 
           <TextField
              autoFocus
              select
              margin="dense"
              id="unit"
              fullWidth
              variant="outlined"
              label= "Unit"
              onChange={changehandler}
              SelectProps={{
                native: true,
              }}
            >
                 <option> Hour </option> 
        <option> Minute </option>
                </TextField> 

        </Grid>
       </Grid>
       </form>
       <Grid container sx={{height:400,marginTop:3}}>
       <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        />
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={disable} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>Submit</Button>
          <Button variant='contained' onClick={()=>{props.setopen()}} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Cancel </Button>
        </DialogActions>
      </Dialog>
  );
}

export default Createtest;