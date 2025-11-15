import React, { useState, useEffect } from "react";

function UsersComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // async function define કરો useEffect અંદર
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data); // state update
        console.log(data); // data console માં
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // async function call કરો
  }, []); // empty dependency means run once on mount

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersComponent;
