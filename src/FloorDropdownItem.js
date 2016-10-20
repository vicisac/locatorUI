/**
 * Created by cano on 20.10.2016.
 */
import React, { Component } from 'react';
import { DropdownItem } from 'reactstrap';

var FloorDropdownItem = React.createClass({

    render: function() {
        return (
            <DropdownItem className="floorList"
                          onClick={this.props.update}
                          value={this.props.floorData.floorId}>
                {this.props.floorData.floorNumber + " @ " + this.props.floorData.buildingId}
            </DropdownItem>
        );
    }
});

export default FloorDropdownItem;