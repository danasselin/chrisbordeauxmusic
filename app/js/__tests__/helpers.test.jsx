import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createNavMenu, createRoutes } from '../helpers.jsx';

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

describe('createRoutes', () => {
  let wrapper;
  const TestComponent = () => <p>Test</p>
  const testRoutes = [
    {
      path: '/route1',
      component: TestComponent,
    },
    {
      path: '/route2',
      component: TestComponent,
      propsData: { test: true },
    }
  ];

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <div className="content"> 
          { testRoutes.map(createRoutes) }
        </div>
      </Router>
    );
  });

  it('Creates a \'Route\' component for a given route object passed', () => {
    const routeComponent = wrapper.find(Route).get(0);
    const routeComponentRenderObj = routeComponent.props.render();
    expect(routeComponent.props.path).toEqual('/route1');
    expect(routeComponentRenderObj.type.name).toEqual('TestComponent');
  });

  it('Passes along a route object\'s propsData to the specified component when applicable', () => {
    const routeComponent = wrapper.find(Route).get(1);
    const routeComponentRenderObj = routeComponent.props.render();
    expect(routeComponentRenderObj.props).toMatchObject({ test: true });
  })

});
