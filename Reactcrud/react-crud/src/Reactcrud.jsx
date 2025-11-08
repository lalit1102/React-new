import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
const Reactcrud = () => {

  const [name,setName] = useState('')
  const [age,setAge] = useState('')
  const [salary,setSalary] = useState('')
  const [data,setData] = useState([]) 

  const saveData = (e) => {
    e.preventDefault() // page refresh nai thay atla mate use thay
    // page ne relode thay ane action ma # ave che te bandh karva mate preventdefault no use thay che
    setData([
      ...data, // ahi data store thay che
      {name,age,salary}
      // {
        // "name":name,
        // 'age':age,
        // "salary":salary
      // }
    ])
  }

  return (
    <>
     <Container maxWidth="md" sx={{ mt: 4 }}>
       <Typography variant="h4" align="center" gutterBottom>User Registration Form</Typography>
        <Paper sx={{ p: 3, mb: 4 }}>
           <form name='frm'action='#' method='post'onSubmit={saveData}>
             <Grid container spacing={2}>

              <Grid item xs={12} >
                <TextField fullWidth label = 'Enter your Name' name='name' type='text' variant='outlined' required onChange={(e)=>setName(e.target.value)} />
              </Grid>

              <Grid item xs={12} >
                <TextField fullWidth label = 'Enter your Age' name='age' type='number' variant='outlined' required onChange={(e)=>setAge(e.target.value)}/>
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label = 'Enter your Salary' name='salary' type='number' variant='outlined' required onChange={(e)=>setSalary(e.target.value)}/>
              </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Button fullWidth variant="contained" color="primary" type="submit"> Save </Button>
                        </Grid>
                    <Grid item xs={6}>
                      <Button fullWidth variant="outlined" color="error" type="reset"> Cancel </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>



          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* ahi data store karya tene show karva mate */}
                    {/* { */}
                    {
                      data.map((i,index)=>{
                        return (
                          <TableRow>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{i.name}</TableCell>
                            <TableCell>{i.age}</TableCell>
                            <TableCell>{i.salary}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" type="button" sx={{ mr: 1 }}> Edit </Button>
                                 <Button variant="contained" color="error" type="button"> delete </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }                   
              </TableBody>
            </Table>
          </Paper>

      </Container>
    </>
  )
}
export default Reactcrud