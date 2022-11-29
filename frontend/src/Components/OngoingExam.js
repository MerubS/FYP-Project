import { Card , Typography , CardContent , CardActions , Button , Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";


const OngoingExam = () => {
  const [testdata,settestdata] = useState(null);
  const [load,setload] =useState(false);
  const [rows,setrows] = useState([]);
  useEffect(() => {
    fetch("/api/retreive")
      .then((res) => res.json())
      .then((data) => {setrows(data.recordset)
        console.log("Data", data);});

    }, []);

    useEffect(() => {
      console.log("Testdata", testdata);
      if (testdata !== null) {
      setload(true);
      }
      }, [testdata]);
      
      // const rows = [
      //   {name: 'Software Engineering' , status: 'Start' , color:'blue'},
      //   {name: 'Agile Practices' , status: 'Resume' , color:'orange'}
      // ];
    
      const columns = [
          // { field: 'test_id', headerName: 'ID', width: 20 },
          { field: 'name', headerName: 'Assessment Name', width: 130 },
          { field: 'description', headerName: 'Description', width: 130 },
          { field: 'status', headerName: 'Status ', width: 130 },
          { field: 'timelimit' , headerName: 'Timelimit', width: 130 },
          { field: 'difficulty', headerName: 'Difficulty', width: 130 },
        ];
 return(
   <Grid sx={{height:'50vh'}}>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     checkboxSelection 
      />

    {/* <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell > Assessment Name </TableCell>
            <TableCell> Description </TableCell>
            <TableCell align="center"> Status </TableCell>
            <TableCell> Time limit </TableCell>
            <TableCell> Difficulty </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {load && testdata.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{borderBottom:'none'}}>
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row" sx={{borderBottom:'none'}}>
                {row.description}
              </TableCell>
              <TableCell align="center" sx={{borderBottom:'none'}}> <Button variant='outlined' sx={{color:row.color , borderColor:row.color}}> {row.status} </Button> </TableCell>
              <TableCell component="th" scope="row" sx={{borderBottom:'none'}}>
                {row.timelimit}
              </TableCell>
              <TableCell component="th" scope="row" sx={{borderBottom:'none'}}>
                {row.difficulty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
 </Grid>
 );

}

export default OngoingExam;