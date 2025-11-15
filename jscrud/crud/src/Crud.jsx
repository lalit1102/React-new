import React, { useState } from 'react'

const Crud = () => {
    // const [firstname,setFirstName] = useState("");
    // const [lastname,setLastName] = useState("")
    // const [data setData] = useState([])
    const [id,setId] = useState("")
    const [data,setData] = useState({
      firstname:"",
      lastname:"",
      salary:""
    })
    const handleChange = (e) => {
    let {name,value} = e.target
    setData({
      ...data,
      [name]:value
    })
    console.log(handleChange)
  };
  const [alldata,setAllData] = useState([])

 const saveData = (e) => {
  e.preventDefault();

  if (id !== "") {
    let res = alldata.map((i, index) => (index === id ? data : i));
    console.log(res);
    
    setAllData(res);
  } else {
    setAllData([...alldata, data]);
  }

  setId("");
  setData({
    firstname: "",
    lastname: "",
    salary: ""
  });
};  
  
  const delData = (id)=>{
    let res = alldata.filter((i,index)=> index != id)
    setAllData(res)
  }
  const editData = (id) => {
  let res = alldata.find((i, index) => index === id)
  if (res) {
    setData(res);
    setId(id);  
  }
};
console.log(editData)

const clearForm = () => {
  setData({
    firstname: "",
    lastname: "",
    salary: ""
  })
  console.log(clearForm)
}      
  return (      
    <>
    <div>
      <h1>Resigstration from</h1>
    </div>
    <div>
      <form action="#" method='post' name='frm' onSubmit={saveData} >
        <div>
      <label htmlFor="">First_Name :
        <input type="text" name="firstname" id="firstname" placeholder='Enter the name'onChange={handleChange}  value={data.firstname}/>
      </label> 
      </div><br />

        <div>
          <label htmlFor="">Last_name  : 
            <input type="text" name="lastname" id="lastname"  placeholder='Enter last Name' onChange={handleChange} value={data.lastname}/>
          </label>
        </div><br />
         <div>
          <label htmlFor="">salary  :  
            <input type="number" name="salary" id="salary" placeholder='Enter salary' onChange={handleChange}  value={data.salary}/>

          </label>
         </div><br />

         <div>
          <button type='submit'>save</button> 
          <button type='button' onClick={clearForm}>clear</button>
          
         </div>

      </form>

            <table border={2}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>First_Name</th>
                  <th>Last_Name</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>


                 {alldata.map((i, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{i.firstname}</td>
                <td>{i.lastname}</td>
                <td>{i.salary}</td>
                <td><button onClick={()=>editData(index)}>Edit</button></td>
                <td><button onClick={()=>delData(index)}>Delete</button></td>
              </tr>
            );
          })}
                
                
              </tbody>
            </table>
    </div>
    </>
  )
}

export default Crud
