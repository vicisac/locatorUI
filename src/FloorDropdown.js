/**
 * Created by cano on 20.10.2016.
 */
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import FloorDropdownItem from './FloorDropdownItem';
import $ from 'jquery';

var FloorDropdown = React.createClass({

    loadCommentsFromServer: function() {

        this.serverRequest = $.get(this.props.url, function (result) {
            this.setState({
                data: result
            });
        }.bind(this));

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
                                       update={this.onClickUpdateFloor}/>
                );
            }
            , this);

        return (
            <Dropdown tether className="m-y-1" isOpen={this.state.dd4} toggle={() => { this.setState({ dd4: !this.state.dd4 })}}>
                <DropdownToggle caret color="primary">
                    {this.state.floorName}
                </DropdownToggle>
                <DropdownMenu>
                    {floorNodes}
                </DropdownMenu>
            </Dropdown>
        );
    }
});

export default FloorDropdown;