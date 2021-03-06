/**
 * Created by cano on 20.10.2016.
 */
import React from 'react';
import { DropdownItem } from 'reactstrap';

var EmployeeDropdownItem = React.createClass({

    render: function() {
        return (
            <DropdownItem className="employeeItem"
                          onClick={this.props.update}
                          value={this.props.employeeData.employeeGuid}>
                {this.props.employeeData.lastName + ", " + this.props.employeeData.firstName}
            </DropdownItem>
        );
    }
});

export default EmployeeDropdownItem;