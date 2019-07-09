import React, { Component } from "react";
import { Tabs,Tab ,Sonnet,TabContainer} from 'react-bootstrap';
class Pills extends Component {
  state = {};
  render() {
    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" style={{background:"white",width:"100%"}}>
        <Tab eventKey="home" title="Home">
          <h1>gggggggg</h1>
        </Tab>
        <Tab eventKey="profile" title="Profile">
        <h1>gjaksd</h1>
        </Tab>
        <Tab eventKey="contact" title="Contact">
        <h1>fashkjlsa</h1>
        </Tab>
      </Tabs>
      );
    }
}

export default Pills;
