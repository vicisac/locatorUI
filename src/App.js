import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import EmployeesDropdown from './EmployeesDropdown';
import FloorDropdown from './FloorDropdown';
import ImageMap from './ImageMap';

/*
class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

*/


var App=React.createClass({

  getInitialState: function () {
    return {
      showEmployee: false,
      myMap : null,
      myEmployee : null,
      myFloor : null,
      myImage : null
    };
  },

  setFloorplanPath : function(buildingId, floorNumber, refToImage){

    fetch('http://localhost:8080/floors/' + buildingId + '/' + floorNumber).then((response) => {return response.json()}).then(function(emplData){
      refToImage.setMapPath('http://localhost:8080' + emplData.floorplanUrl);
    }).catch((error) => {
      console.error(error);
    });
  },

  setEmployeeImages : function(employeeId, buildingId, roomName, refToImage){
    fetch('http://localhost:8080/rooms/' + buildingId + '/' + roomName).then((response) => {return response.json()}).then(function(roomData){
      var style =
      {
        transition: 'all 0.5s',
        visibility: 'visible',
        maxWidth: '5%',
        position: 'absolute',
        top: roomData.styleTop,
        left: roomData.styleLeft
      }
      refToImage.setMapPath('http://localhost:8080/' + employeeId + '.jpg');
      refToImage.setStyleProps(style);
    }).catch((error) => {
      console.error(error);
    });
  },

  onSelectEmployee: function(index, emplData) {

    var res = emplData.location.split("@");
    var buildingId = res[2];
    var floorNumber = res[1];
    var roomName = res[0];
    this.setFloorplanPath(buildingId, floorNumber, this.state.myMap);
    this.setEmployeeImages(emplData.id, buildingId, roomName, this.state.myImage);
    this.state.myFloor.updateFloor(res[1] + ' @ ' + res[2]);
  },

  onSelectFloor: function(index, flData) {

    this.setFloorplanPath(flData.buildingId, flData.floorNumber, this.state.myMap);
    this.state.myEmployee.updateName('Select an Employee');
    var style = {visibility: 'hidden'};
    this.state.myImage.setStyleProps(style);

  },

  onMouseEnterHandler: function() {
    var newStyle =
    {
      transition: 'all 0.5s',
      visibility: 'visible',
      maxWidth: '35%',
      position: 'absolute',
      top: this.state.myImage.state.style.top,
      left: this.state.myImage.state.style.left
    }

    this.state.myImage.setStyleProps(newStyle);

    console.log('enter');
  },
  onMouseLeaveHandler: function() {
    var newStyle =
    {
      transition: 'all 0.5s',
      visibility: 'visible',
      maxWidth: '5%',
      position: 'absolute',
      top: this.state.myImage.state.style.top,
      left: this.state.myImage.state.style.left
    }

    this.state.myImage.setStyleProps(newStyle);
    console.log('leave');
  },

  render: function() {
    return (

        <div className="selectorBox">
          <Container>
            <h1>Resource Locator</h1>
            <hr/>
            <Row>
              <Col>
                <EmployeesDropdown onChange={this.onSelectEmployee} url="http://localhost:8080/employees" ref={(ref) => this.state.myEmployee = ref}/>
                <FloorDropdown onChange={this.onSelectFloor} url="http://localhost:8080/floors" ref={(ref) => this.state.myFloor = ref}/>
                <ImageMap className="FloorMap" ref={(ref) => this.state.myMap = ref}/>
                <ImageMap show ={false}
                          className="staff"
                          ref={(ref) => this.state.myImage = ref}
                          hoverEnter={this.onMouseEnterHandler}
                          hoverLeave={this.onMouseLeaveHandler}
                />
              </Col>
            </Row>
            <hr/>
          </Container>
        </div>

    );
  }
});

export default App;
