import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('No employee picture is shown during startup', () => {
    // Render a locator
    const locator = TestUtils.renderIntoDocument(
        <App/>
    );

    // Verify that it's Off by default
    expect(locator.state.showEmployee).toEqual(false);

});

it('Initial state of Floor dropdown', () => {
    // Render a locator

    var locator = TestUtils.renderIntoDocument(
        <App/>
    );

    var employeeDropdown = TestUtils.findRenderedDOMComponentWithTag(
       locator,
        'EmployeeDropdown'
    );

    // Verify that it's Off by default
//    expect(floorDropdown.state.floorName).toEqual('Select a Floor');
});
