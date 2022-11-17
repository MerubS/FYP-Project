import { Typography , Grid , Button , Box } from "@mui/material";
import folder from '../Images/folder.svg';

const Uploadpic = () => {
   return (
      <Grid container justifyContent="center" alignItems="center" style={{background: 'linear-gradient(#FFFFFF,#02386E)',height:'100vh'}}>
         <Grid alignItems="center" style={{height:'30vh' , width:'70vh',borderRadius: '0.5rem' , padding:"25px", borderStyle:'dashed', borderColor:'white' }}>
             <img src={folder} style={{ height: '4rem' , width: '4rem' , margin:'auto' , display:'block' }}/>
             <Typography align="center">
                Drag your picture here to start uploading.
             </Typography>
             <Typography align="center" style={{color:'grey'}}> ------------ OR ----------- </Typography>
             <Box align="center" style={{padding:'10px'}}>
             <Button variant="contained" style={{color:'white' , background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)' , margin:'auto'}} > Browse Files </Button>
             </Box>
         </Grid>
      </Grid>
   );
} 

export default Uploadpic;