import { Card , Typography , CardContent , CardActions , Button , Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const OngoingExam = () => {
    function createData(name, calories) {
        return { name, calories};
      }
      
      const rows = [
        {name: 'Software Engineering' , status: 'Start' , color:'blue'},
        {name: 'Agile Practices' , status: 'Resume' , color:'orange'}
      ];
 return(
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell > Assesment Name </TableCell>
            <TableCell align="center"> Status </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{borderBottom:'none'}}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{borderBottom:'none'}}> <Button variant='outlined' sx={{color:row.color , borderColor:row.color}}> {row.status} </Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
  </Card>
 );

}

export default OngoingExam;