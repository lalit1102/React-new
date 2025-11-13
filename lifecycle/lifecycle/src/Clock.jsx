import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // count: 0,
      name: this.props.myname,
    };

    console.log("constructer called...");
  }

  componentDidMount() {
    console.log("componentDid mount called");
    const nameUser =  setTimeout(() => {this.setState({  name: "baldaniya",});}, 3000);
    
    console.log(nameUser);
  }
  static getDerivedStateFromProps(props,state){
  console.log("getDerivedStateFromProps called....");
  console.log("props");
  console.log(props);
  console.log("state");
  console.log(state);
  return null
  }


  render() {
    return (
      <div>
        <p>The current time is </p>
      </div>
    );
  }
}
export default Clock;
