import React,{useEffect} from 'react'

const UseEffect = () => {
  // useEffect(() => {
  // console.log("Component re-render થયો");
// });
// 
// useEffect(() => {
  // console.log("Component first time mount થયું");
// }, []);

const abc = useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => console.log(res.json()))
    
    .then(data => console.log(data))
    .catch(res =>console.log(res) );
}, []);

console.log("here is ", typeof abc)
// useEffect(() => {
  // const timer = setInterval(() => {
    // console.log("Timer running...");
  // }, 100000);

  // return () => {
    // clearInterval(timer);
    // console.log("Timer cleanup");
  // };
// }, []);
// 


  return (
    <div>
      heelo
    </div>
  )
}

export default UseEffect
