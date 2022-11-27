import {Dialog, Button , DialogActions , DialogContent , Typography , TextField , DialogTitle, Grid, MenuItem} from '@mui/material';
import { margin } from '@mui/system';
import { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const Createtest = (props) => {
    // const handleChange = (event) => {
    //     setData(event.target.value);
    //   };
      const columns = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'question', headerName: 'Question', width: 130 },
        { field: 'difficulty', headerName: 'Diffculty', width: 130 },

      ];
      const rows = [
        {id:1, question: 1, difficulty: 'Snow'},
        {id:2, question: 2, difficulty: 'Lannister'},
        {id:3, question: 3, difficulty: 'Lannister' },
        {id:4, question: 4, difficulty: 'Stark'},
        {id:5, question: 5, difficulty: 'Targaryen'},
        {id:6, question: 6, difficulty: 'Melisandre' },
        {id:7, question: 7, difficulty: 'Clifford'},
        {id:8, question: 8, difficulty: 'Frances'},
        {id:9, question: 9, difficulty: 'Roxie'},
      ];
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
              multiline
            /> 
        </Grid>
       <Grid container justifyContent="space-evenly">
        <Grid item xs={5}>
        <TextField
              autoFocus
              margin="dense"
              id="nquestions"
              fullWidth
              variant="outlined"
              label= "No.of Questions"
            /> 
            <TextField
              autoFocus
              margin="dense"
              id="timelimit"
              fullWidth
              variant="outlined"
              label= "Timelimit"
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
          <Button variant='contained' style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>Submit</Button>
          <Button variant='contained' style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Cancel </Button>
        </DialogActions>
      </Dialog>
  );
}

export default Createtest;