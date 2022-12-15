import { Card , Typography , CardContent , Box , Button , Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import tick from '../Icons/tick.svg';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
const Exammanager = () => {
  const [rows,setrows] = useState([]);
  const columns = [
    // { field: 'test_id', headerName: 'ID', width: 20 },
    { field: 'name', headerName: 'Assessment Name', width: 130 },
    { field: 'description', headerName: 'Time Started', width: 130 },
    { field: 'status', headerName: 'Time Ended ', width: 130 },
    { field: 'difficulty', headerName: 'Difficulty', width: 130 },
  ];
   
return (
  <Grid container>

<Grid xs={12} sx={{height:'30vh',padding:'30px'}}>
  <DataGrid
   rows={rows}
   columns={columns}
   pageSize={10}
   rowsPerPageOptions={[10]}
   checkboxSelection 
    />

  </Grid>
  
    </Grid>
  //   <Card sx={{ minWidth: 275 }}>
  //   <CardContent>
  //   <TableContainer>
  //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell sx={{borderBottom:'none'}} > Ongoing Sessions </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {rows.map((row) => (
  //           <TableRow
  //             key={row.name}
  //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //           >
  //            <TableCell sx={{borderBottom:'none'}}>
  //            <Box style={{display:'flex'}}>
  //              <img src={tick} style={{ height: '1.5rem' , width: '1.5rem' , paddingTop:5}} alt="tickmark"/>
  //             </Box>
  //             </TableCell>
  //             <TableCell align="left" sx={{borderBottom:'none'}}>
  //               {row.name} 
  //             </TableCell>
  //             <TableCell align="left" sx={{borderBottom:'none'}}>
  //              <Typography> {row.time} min </Typography> 
  //             </TableCell>
  //             <TableCell align="center" sx={{borderBottom:'none'}}> <Paper> {row.level} </Paper> </TableCell>
            
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  //   </CardContent>
    
  // </Card>
);
}

export default Exammanager;