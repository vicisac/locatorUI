import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import EmployeeDropdown from './EmployeeDropdown';
import FloorDropdown from './FloorDropdown';
import FloorDropdownItem from './FloorDropdownItem';
import $ from 'jquery';

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

    it('Check listed items of Floor dropdown', () => {

        const wrapper = mount(<App />)
            .render()
            .find('div')
            .find('Container')
            .find('Row')
            .find('Col')
            .find('FloorDropdown')
            .find('Dropdown');
        console.log( wrapper.length);

    });
});