import { Button , Grid } from "@mui/material";
import axios from "axios";
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";


const OngoingExam = () => {
  const [load,setload] =useState(false);
  const [currrow , setcurrrow] = useState();
  const [rows,setrows] = useState([]);
  useEffect(() => {
    axios.get('/api/retreive')
    .then(function (response) {
      setrows(response.data.recordset);
    })

    }, []);

    const deletetest = () => {
      axios.get('/api/deletetest',{params:{id:currrow}})
    .then(function (response) {
      console.log(response.message);         // Check wont show message
    })
    }

    const updatestatus = async (e,curr) =>{
      console.log(curr)
      if (curr.status == 'created   ') {
        try {
          const resp = await axios.post('http://localhost:5000/api/updatetest',{status:'started',test_id:curr.test_id , timelimit:curr.timelimit , unit: curr});
          console.log(resp.data.message);
         }
         catch (error) {
             console.log(error.response);
         }
      }

      if (curr.status == 'started   ') {
        try {
          const resp = await axios.post('http://localhost:5000/api/updatetest',{status:'ended',test_id:curr.test_id});
          console.log(resp.data.message);
         }
         catch (error) {
             console.log(error.response);
         }
      }
    }

    
      const columns = [
          // { field: 'test_id', headerName: 'ID', width: 20 },
          { field: 'name', headerName: 'Assessment Name', width: 130 },
          { field: 'description', headerName: 'Description', width: 130 },
          { field: 'status', headerName: 'Status ', width: 130 , renderCell: (params) => {
            return (
              <Button variant="contained" size="small" onClick={(e)=>{updatestatus(e,params.row)}}>
                {params.row.status}
              </Button>
            );
          } , disableClickEventBubbling: true  },
          { field: 'timelimit' , headerName: 'Timelimit', width: 130 },
          { field: 'difficulty', headerName: 'Difficulty', width: 130 },
        ];
 return(
   <Grid sx={{height:'50vh'}}>
    <Grid container justifyContent='end' style={{padding:'5px'}}> 
    <Button color="primary" size="medium" onClick={deletetest} startIcon={<DeleteIcon />}> </Button>
    <Button color="primary" size="medium" startIcon={<EditIcon />}> </Button>
     </Grid>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     onRowClick={(e)=>{setcurrrow(e.id)}}
   
      />
 </Grid>
 );

}

export default OngoingExam;