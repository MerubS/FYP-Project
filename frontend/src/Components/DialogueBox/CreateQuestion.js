import {Dialog, Button , DialogActions , DialogContent , Typography , TextField , DialogTitle, Grid, MenuItem} from '@mui/material';
const CreateQuestion = (props) => {
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
          id="question"
          fullWidth
          variant="outlined"
          label="Question"
        /> 
    </Grid>    
    <Grid container justifyContent="space-evenly">
        <TextField
          autoFocus
          margin="dense"
          id="difficulty"
          fullWidth
          variant="outlined"
          label= "Difficulty"
          select
        >
            <option> Easy </option>
            <option> Medium </option>
            <option> Hard </option>
            </TextField> 
    </Grid>
   <Grid container justifyContent="space-evenly">
    <Grid item xs={5}>
    <TextField
          autoFocus
          margin="dense"
          id="option1"
          fullWidth
          variant="outlined"
          label= "Option1"
        /> 
        <TextField
          autoFocus
          margin="dense"
          id="option2"
          fullWidth
          variant="outlined"
          label= "Option2"
        />    
    </Grid>
    <Grid item xs={5}>
    <TextField
          autoFocus
          margin="dense"
          id="option3"
          fullWidth
          variant="outlined"
          label= "Option3"
        >
    </TextField> 
       <TextField
          autoFocus
          margin="dense"
          id="option3"
          fullWidth
          variant="outlined"
          label= "Option3"
        >
            </TextField> 

    </Grid>
   </Grid>
   </form>
   </DialogContent>
   <DialogActions>
          <Button variant='contained' style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>Submit</Button>
          <Button variant='contained' style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Cancel </Button>
        </DialogActions>
   </Dialog>
 );
}

export default CreateQuestion;