import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  // Redirect,
} from 'react-router-dom';
import { HcSiteRoutes } from '../routes.jsx';

function navMenu() {
  const items = [
    'listen',
    'video',
    'press',
    'shows',
    'blog',
  ];
  const createLinks = (item, i) => (
    <Link key={i} to={`/${item}`}>
      <li>{item}</li>
    </Link>
  );
  return items.map(createLinks);
}

const createRoutes = route => (
  <Route
    path={ route.path }
    render={ (props) => {
      let updatedProps;
      if (route.propsData) {
        updatedProps = Object.assign({}, props, route.propsData);
        return <route.component {...updatedProps} />;
      }
      return <route.component {...props} />;
    }}
  />
);

class App extends React.Component {
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Router>
        <div className="content">
          <header className="banner">
            <h1>Hayride Casualties</h1>
          </header>
          <nav className="hc-nav">
            <ul>
              { navMenu() }
            </ul>
          </nav>
          <main className="hc-hero"></main>

          { HcSiteRoutes.map(createRoutes) }

        </div>
      </Router>
    );
  }
}

export default App;
