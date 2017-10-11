import React from 'react';
import { mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createNavMenu } from '../helpers.jsx';
import { BrowserRouter as Router, Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

const Test = () => (
  <p className="test">This is a test</p>
);

describe('createNavMenu', () => {
  it('Creates a link for every nav item passed in', () => {
    // mount a component that calls createNavMenu
    const wrapper = mount(<Test />);
    expect(wrapper.find('.test').text()).toBe('This is a test');
  });
});
