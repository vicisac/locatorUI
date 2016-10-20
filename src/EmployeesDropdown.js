/**
 * Created by cano on 20.10.2016.
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import EmployeeDropdownItem from './EmployeeDropdownItem';
import $ from 'jquery';

var EmployeesDropdown = React.createClass({

    loadCommentsFromServer: function() {
        this.serverRequest = $.get(this.props.url, function (result) {
            this.setState({
                data: result
            });
        }.bind(this));

        /*
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
        });*/
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

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        var employeeNodes = this.state.data.map(
            function (employee) {
                return (
                    <EmployeeDropdownItem employeeData={employee}
                                          key={employee.employeeGuid}
                                          update={this.onClickUpdateName}
                    />
                );
            }
            , this);

        return (
            <Dropdown tether className="m-y-1" isOpen={this.state.dd4} toggle={() => { this.setState({ dd4: !this.state.dd4 })}}>
                <DropdownToggle caret>
                    {this.state.chosenName}
                </DropdownToggle>
                <DropdownMenu>
                    {employeeNodes}
                </DropdownMenu>
            </Dropdown>
        );
    }
});

export default EmployeesDropdown;