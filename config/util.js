const path = require('path');

module.exports = {
  app: path.join(__dirname, '..', 'app'),
  build: path.join(__dirname, '..', 'build'),
  styles: path.join(__dirname, '..', 'app', 'css', 'main.css'),
  site_data: path.join(__dirname, '..', 'app', 'site_data'),
};
