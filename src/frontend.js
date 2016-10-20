const {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Container, Row, Col
} = Reactstrap;

var ImageMap = React.createClass({

    getInitialState: function() {
        return {
            mapPath : this.props.imgSource
        };
    },

    setMapPath : function(newPath){
        this.setState(
            {mapPath : newPath}
        );
    },

    setStyleProps : function(style){
        this.setState(
            {style : style}
        );
    },

    render: function() {

        return (
            <div>
                <img src={this.state.mapPath}
                     style={this.state.style}
                     onMouseEnter={this.props.hoverEnter}
                     onMouseLeave={this.props.hoverLeave}
                />
            </div>
        );
    }
});


var FloorDropdown = React.createClass({

    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    updateFloor : function(newName){
        this.setState(
            {floorName : newName}
        );
    },

    onClickUpdateFloor : function(e){

        var flData = this.state.data[e.target.value];
        var newFloor = flData.floorNumber + " @ " + flData.buildingId;
        this.props.onChange(e.target.value, flData);
        this.updateFloor(newFloor);
    },

    getInitialState: function() {
        return {
            floorName : 'Select a Floor',
            data: []
        };
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    render: function() {
        var floorNodes = this.state.data.map(
            function (floor) {
                return (
                    <FloorDropdownItem floorData={floor}
                                       key={floor.floorId}
                                       update = {this.onClickUpdateFloor}/>
                );
            }
            , this);

        return (
            <Dropdown tether className="m-y-1" isOpen={this.state.dd4} toggle={() => { this.setState({ dd4: !this.state.dd4 })}}>
                <DropdownToggle caret>
                    <Button color="primary">{this.state.floorName}</Button>
                </DropdownToggle>
                <DropdownMenu>
                    {floorNodes}
                </DropdownMenu>
            </Dropdown>
        );
    }
});

var FloorDropdownItem = React.createClass({

    render: function() {
        return (
            <DropdownItem className="floorList"
                          onClick={this.props.update}
                          value = {this.props.floorData.floorId}>
                {this.props.floorData.floorNumber + " @ " + this.props.floorData.buildingId}
            </DropdownItem>
        );
    }
});

var EmployeesDropdown = React.createClass({

    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {
            chosenName: 'Select an Employee',
            data: []
        };
    },

    updateName : function(newName){
        this.setState({chosenName : newName});
    },

    onClickUpdateName : function(e){
        var emplData = this.state.data[e.target.value];
        var newName = emplData.lastName + ", " + emplData.firstName;
        this.props.onChange(e.target.value, emplData);
        this.updateName(newName);
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    render: function() {
        var employeeNodes = this.state.data.map(
            function (employee) {
                return (
                    <EmployeeDropdownItem employeeData={employee}
                                          key={employee.employeeGuid}
                                          update = {this.onClickUpdateName}
                    />
                );
            }
            , this);

        return (
            <Dropdown tether className="m-y-1" isOpen={this.state.dd4} toggle={() => { this.setState({ dd4: !this.state.dd4 })}}>
                <DropdownToggle caret>
                    <Button color="primary">{this.state.chosenName}</Button>
                </DropdownToggle>
                <DropdownMenu>
                    {employeeNodes}
                </DropdownMenu>
            </Dropdown>
        );
    }
});

var EmployeeDropdownItem = React.createClass({

    render: function() {
        return (
            <DropdownItem className="employeeList"
                          onClick={this.props.update}
                          value = {this.props.employeeData.employeeGuid}>
                {this.props.employeeData.lastName + ", " + this.props.employeeData.firstName}
            </DropdownItem>
        );
    }
});

var SelectorBox = React.createClass({

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

        fetch('/floors/' + buildingId + '/' + floorNumber).then((response) => {return response.json()}).then(function(emplData){
            refToImage.setMapPath(emplData.floorplanUrl);
        }).catch((error) => {
            console.error(error);
        });
    },

    setEmployeeImages : function(employeeId, buildingId, roomName, refToImage){
        fetch('/rooms/' + buildingId + '/' + roomName).then((response) => {return response.json()}).then(function(roomData){
            var style =
            {
                transition: 'all 0.5s',
                visibility: 'visible',
                maxWidth: '5%',
                position: 'absolute',
                top: roomData.styleTop,
                left: roomData.styleLeft
            }
            refToImage.setMapPath(employeeId + '.jpg');
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
                            <EmployeesDropdown onChange={this.onSelectEmployee} url="/employees" ref={(ref) => this.state.myEmployee = ref}/>
                            <FloorDropdown onChange={this.onSelectFloor} url="/floors" ref={(ref) => this.state.myFloor = ref}/>
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

ReactDOM.render(
    <SelectorBox/>,
    document.getElementById('content')
);
