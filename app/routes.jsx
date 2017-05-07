import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { getCours, getUsers } from './fetch-data';
import App from 'components/App';
import About from 'components/front/about/component';
import LoginOrRegister from 'components/front/login/component';
import Home from 'components/front/home/component';
import Users from 'components/front/users/usersPage';
import Dashboard from 'components/admin/dashboard/component';
import Myprofil from 'components/admin/myprofil/myProfilPage';

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
            <IndexRoute component={Home} fetchMyDatas={getCours}/>
            <Route path="/userslist" component={Users} fetchMyDatas={getUsers} />

            {/*
            <IndexRoute component={Users} fetchMyDatas={fetchUser}>
               <Route path="/:userId" component={User}/>
            </IndexRoute>
            */}

            <Route path="dashboard" component={Dashboard} fetchMyDatas={getCours} onEnter={requireAuth}/>
            <Route path="login" component={LoginOrRegister} onEnter={redirectAuth}/>
            <Route path="myprofil" component={Myprofil} onEnter={requireAuth}/>
            <Route path="about" component={About}/>
        </Route>
    );
};
