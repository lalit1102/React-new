import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Table } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Axioscrud = () => {
  const [data, setData] = useState({
    name: "",
    study: "",
    course: "",
  });

  const [alldata, setAlldata] = useState([]);
  const [id, setId] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const savedata = (e) => {
    e.preventDefault();
    if (id !== "") {
      axios
        .put("http://localhost:3000/user/" + id, data)
        .then(console.log("updated data"));
      disp();
      setId("");
    } else {
      axios
        .post("http://localhost:3000/user", data)
        .then(console.log("insert data first step"));
      disp();
    }
    setData({
      name: "",
      study: "",
      course: "",
    });
  };

  const disp = () => {
    axios
      .get("http://localhost:3000/user")
      .then((res) => setAlldata(res.data))
      .then(console.log("display data 2nd step"));
  };
  useEffect(() => {
    disp();
  }, []);

  const deldata = (id) => {
    axios
      .delete("http://localhost:3000/user/" + id)
      .then(console.log("deleted...3rd step"));
   
  };
  const editdata = (id) => {
    axios
      .patch("http://localhost:3000/user/" + id)
      .then((res) => setData(res.data))
      .then(console.log("edit data 4th step"));
    setId(id);
  };

  return (
    <>
      <Form action="#" method="post" onSubmit={savedata}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={data.name}
            onChange={handlechange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Study</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter study"
            name="study"
            value={data.study}
            onChange={handlechange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course"
            name="course"
            value={data.course}
            onChange={handlechange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id === "" ? "Submit" : "Update"}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Study</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {alldata.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.study}</td>
                <td>{item.course}</td>
                <td>
                  <button onClick={() => editdata(item.id)}>Edit</button>
                  <button onClick={() => deldata(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Axioscrud;
