import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { createNavMenu } from '../helpers.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('createNavMenu', () => {

  let wrapper;
  const menuItems = ['item1', 'item2', 'item3'];

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <div className='nav'>
          { createNavMenu(menuItems) }
        </div>
      </Router>
    );
  });

  it('Creates an <a> wrapping an <li> for every menu item name passed in', () => {
    expect(wrapper.find('a li').length).toEqual(3);
  });

  it('Each <li> text matches the menu item name from the array', () => {
    expect(wrapper.find('li').first().text()).toEqual('item1');
  });
});
