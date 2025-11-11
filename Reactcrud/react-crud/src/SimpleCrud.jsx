import React, { useState } from 'react'

const SimpleCrud = () => {
  const [name,setName] = useState("")
  const [age,setAge] = useState("")
  const [salary,setSalary] = useState("")
  const [data,setData] = useState([])
  const saveData = (e)=>{
     e.preventDefault()
     setData([
      ...data,
      {name,age,salary}
     ])
  }

  return (
    <>
    <div>
      <form action='#' method='post' onSubmit={saveData}>
        <label>Enter Name:---😊-  </label>
        <input type="text" name="name" id="name" placeholder='Enter Your name'onChange={(e)=>setName(e.target.value)} /><br /><br />
        <label>Enter Age:-----</label>
        <input type="number" name="age" id="age" placeholder='Enter your age'onChange={(e)=>setAge(e.target.value)} /><br /><br />
        <label >Enter salary</label>
        <input type="number" name="salary" id="salary" placeholder='salary'onChange={(e)=>setSalary(e.target.value)} /><br /><br />
        <button type='submit'>save</button><br /><br />
        <button type='reset'>cancel</button>
      </form>
      <div>
        <table border="1">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Age</th>
      <th>Salary</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((i, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{i.name}</td>
        <td>{i.age}</td>
        <td>{i.salary}</td>
        <td>
         <button>edit</button>
         <button>delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
    </div>
    </>
    
    
    
    
  )
}

export default SimpleCrud
