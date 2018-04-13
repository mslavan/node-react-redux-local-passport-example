import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './redux'

injectTapEventPlugin();

const store = configureStore();

render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
document.getElementById('root') )
