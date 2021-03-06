import React from 'react';
import ReactOnRails from 'react-on-rails';

import HelloWorld from '../containers/HelloWorld';

const HelloWorldApp = () => (
  <HelloWorld />
);

window.HelloWorldApp = HelloWorldApp;


// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({
  HelloWorldApp
});
