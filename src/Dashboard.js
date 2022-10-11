import { Grid } from "@mui/material";
import OngoingExam from "./OngoingExam";
import Exammanager from "./Exammanager";

const Dashboard = () => {
 return (
   <Grid container spacing={3}>
   <Grid item xs={6}>
     <OngoingExam/>
   </Grid>
   <Grid item xs={6}>
     <Exammanager/>
   </Grid>
   </Grid>
 );
}

export default Dashboard;