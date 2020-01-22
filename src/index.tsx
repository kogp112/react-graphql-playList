import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

render(<App />, document.getElementById('root'));

// Hot Module Replacement
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept("./App", () => {
    const App = require("./App").default;

    render(<App />, document.getElementById("root"));
  });
}