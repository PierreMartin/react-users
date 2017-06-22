import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from 'routes';
import * as types from 'types';
import configureStore from 'store/configureStore';
import fetchDataForRoute from './middlewares/fetchDataForRoute';


import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan700, grey600, pinkA100, pinkA200, pinkA400, fullWhite } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

injectTapEventPlugin();

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store     = configureStore(initialState, browserHistory);
const history   = syncHistoryWithStore(browserHistory, store);
const routes    = createRoutes(store);

const muiTheme = getMuiTheme({
		borderRadius: 2,
		palette: {
				primary1Color: cyan700,
				primary2Color: cyan700,
				primary3Color: grey600,
				accent1Color: pinkA200,
				accent2Color: pinkA400,
				accent3Color: pinkA100,
				textColor: fullWhite,
				secondaryTextColor: fade(fullWhite, 0.7),
				alternateTextColor: '#303030',
				canvasColor: '#303030',
				borderColor: fade(fullWhite, 0.3),
				disabledColor: fade(fullWhite, 0.3),
				pickerHeaderColor: fade(fullWhite, 0.12),
				clockCircleColor: fade(fullWhite, 0.12),
		},
},
{
		avatar: {
				borderColor: null
		},
});

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
    // Prevent duplicate fetches when first loaded.
    // Explanation: On server-side render, we already have __INITIAL_STATE__
    // So when the client side onUpdate kicks in, we do not need to fetch twice.
    // We set it to null so that every subsequent client-side navigation will
    // still trigger a fetch data.
    // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
    if (window.__INITIAL_STATE__ !== null) {
        window.__INITIAL_STATE__ = null;
        return;
    }

    // store.dispatch({type: types.CREATE_REQUEST});

    fetchDataForRoute(this.state, store);
        /*.then(data => {
            return store.dispatch({ type: types.REQUEST_SUCCESS, data: data });
        })
        .catch(error => {
            return store.dispatch({ type: types.REQUEST_FAILURE, data: error});
        });*/
}


// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
		<MuiThemeProvider muiTheme={muiTheme}>
				<Provider store={store}>
						<Router history={history} onUpdate={onUpdate}>
								{routes}
						</Router>
				</Provider>
		</MuiThemeProvider>,
		document.getElementById('app')
);
