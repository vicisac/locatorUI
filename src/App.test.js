import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import EmployeeDropdown from './EmployeeDropdown';
import FloorDropdown from './FloorDropdown';
import FloorDropdownItem from './FloorDropdownItem';

import App from './App';

describe('<App />', () => {

    it('should render stuff', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.length).toEqual(1);
    });

    it('No employee picture is shown during startup', () => {

        const wrapper = shallow(<App />);
        // Verify that it's Off by default
        expect(wrapper.state('showEmployee')).toEqual(false);

    });

    it('Check state of Floor dropdown after startup', () => {

        const wrapper = mount(<App />)
            .find('div')
            .find('Container')
            .find('Row')
            .find('Col')
            .find('FloorDropdown')
            .find('Dropdown')
            .find('DropdownToggle');
        expect(wrapper.text()).toEqual('Select a Floor');

    });

    it('Check state Employee dropdown after startup', () => {

        const wrapper = mount(<App />)
            .find('div')
            .find('Container')
            .find('Row')
            .find('Col')
            .find('EmployeeDropdown')
            .find('Dropdown')
            .find('DropdownToggle');
        expect(wrapper.text()).toEqual('Select an Employee');

    });

    it('FloorDropdown calls componentDidMount', () => {

        sinon.spy(FloorDropdown.prototype, 'componentDidMount');
        const wrapper = mount(
            <FloorDropdown
                className="MyFloors"
                url="http://localhost:8080/floors"/>
        );

        expect(FloorDropdown.prototype.componentDidMount.calledOnce).toEqual(true);

    });

    it('EmployeeDropdown calls componentDidMount', () => {

        sinon.spy(EmployeeDropdown.prototype, 'componentDidMount');
        const wrapper = mount(
            <EmployeeDropdown className="MyEmployees"
                              url="http://localhost:8080/employees"/>
        );

        expect(EmployeeDropdown.prototype.componentDidMount.calledOnce).toEqual(true);
    });

});