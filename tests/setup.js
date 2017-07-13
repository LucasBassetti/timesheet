const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom();
global.window = document.defaultView;
global.FormData = document.defaultView.FormData;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
