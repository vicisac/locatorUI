/**
 * Created by cano on 20.10.2016.
 */
import React from 'react';
import { DropdownItem } from 'reactstrap';

var FloorDropdownItem = React.createClass({

    render: function() {
        return (
            <DropdownItem className="floorItem"
                          onClick={this.props.update}
                          value={this.props.floorData.floorId}>
                {this.props.floorData.floorNumber + " @ " + this.props.floorData.buildingId}
            </DropdownItem>
        );
    }
});

export default FloorDropdownItem;