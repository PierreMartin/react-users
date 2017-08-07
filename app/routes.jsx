import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { getCours, getUsers, getUser } from './fetch-data';

import App from 'components/App';
import About from 'components/front/about/component';
import LoginOrRegister from 'components/front/login/component';
import Home from 'components/front/home/component';

import Users from 'components/admin/usersList/usersPage';
import User from 'components/admin/userSingle/userSinglePage';
import Settings from 'components/admin/settings/settingsPage';

import SettingsProfil from 'components/admin/settings/tabs/settingsProfil';
import SettingsAcount from 'components/admin/settings/tabs/settingsAcount';

import Dashboard from 'components/admin/dashboard/component';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {

    const requireAuth = (nextState, replace, callback) => {
        const { userAuth: { authenticated }} = store.getState();

        if (!authenticated) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
        }

        callback();
    };


    const redirectAuth = (nextState, replace, callback) => {
        const { userAuth: { authenticated }} = store.getState();

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
            <Route path="/userslist" component={Users} fetchMyDatas={getUsers} onEnter={requireAuth} />
            <Route path='/user/:id' component={User} fetchMyDatas={getUser} onEnter={requireAuth} />

            <Route path='/settings' component={Settings} onEnter={requireAuth} >
              <Route path='/settings/profil/:id' component={SettingsProfil} fetchMyDatas={getUser} onEnter={requireAuth} />
              <Route path='/settings/acount/:id' component={SettingsAcount} fetchMyDatas={getUser} onEnter={requireAuth} />
            </Route>

            {/*<Route path="/userslist" component={Users} fetchMyDatas={getUsers} onEnter={requireAuth} >
               <Route path=":userId" component={User}/>
            </Route>*/}

            <Route path="dashboard" component={Dashboard} fetchMyDatas={getCours} onEnter={requireAuth}/>
            <Route path="login" component={LoginOrRegister} onEnter={redirectAuth}/>
            <Route path="myprofil" component={User} onEnter={requireAuth}/>
            <Route path="about" component={About}/>
        </Route>
    );
};
