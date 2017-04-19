import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData } from 'fetch-data';
import App from 'components/App';
import About from 'components/front/about/component';
import LoginOrRegister from 'components/front/login/component';
import Home from 'components/front/home/component';
import Dashboard from 'components/admin/dashboard/component';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {

    const requireAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();

        if (!authenticated) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
        }

        callback();
    };


    const redirectAuth = (nextState, replace, callback) => {
        const { user: { authenticated }} = store.getState();

        if (authenticated) {
            replace({
                pathname: '/dashboard'
            });
        }

        callback();
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} fetchData={fetchVoteData}/>
            {/*
            <IndexRoute component={Users} fetchData={fetchVoteData}>
               <Route path="/:userId" component={User}/>
            </IndexRoute>
            */}

            <Route path="dashboard" component={Dashboard} fetchData={fetchVoteData} onEnter={requireAuth}/>
            <Route path="login" component={LoginOrRegister} onEnter={redirectAuth}/>
            <Route path="about" component={About}/>
        </Route>
    );
};
