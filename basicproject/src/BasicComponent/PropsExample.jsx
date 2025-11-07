import { useState } from "react";
import React  from 'react'
// here two props use name and role ane jeni value apde PropsExample ma Greeting mathi call karavvani che.
// emojy mate windows key ane + ane . ni key sathe press karvathi male che

const Greeting = ({ name, role }) => {
  return (
    <div className="example-card">
      <h3>👋 Hello , {name}!</h3>
      <p>Role: {role}</p>
    </div>
  );
};

// ahi apde Usercard nu function banavyu che jema apde ternary operator thi check kari ne 
// apde PropsExample ma UserCard mathi call karavvani che.

const UserCard = ({ username = "Guest", age = 25, isOnline = false }) => {
  return (
    <div className="example-card">
      <h3>User Profile</h3>
      <p>Username: {username}</p>
      <p>Age😂: {age}</p>
      <p>Status: {isOnline ? "🟢 Online" : "⚫ Offline"}</p>
    </div>
  );
};


const Counter = ({ initialCount = 0, onCountChange }) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange && onCountChange(newCount);
  };

    const handleDecrement = () => {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange && onCountChange(newCount);
    };

  return (
    <div className="example-card">
      <h3>Counter: {count}</h3>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement} style={{marginLeft: '8px', backgroundColor: '#dc3545'}}>Decrement</button>
    </div>
  );
};


const PropsExample = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px'}}>React Props and State Examples</h2>
      
    
      <Greeting name="Lalit Baldaniya" role="Developer" />
      
      
      <UserCard username="lalit123" age={28} isOnline={true} />
      <UserCard /> 
      
     
      <Counter 
        initialCount={0}
        onCountChange={(newCount) => setTotalCount(newCount)}
      />
        <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '18px'}}>Total count : {totalCount}</p>

      <style>{`
        .example-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          background-color: #f9f9f9;
        }
        button {
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default PropsExample
