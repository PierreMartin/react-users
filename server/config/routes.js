import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController   = controllers && controllers.users;
const topicsController  = controllers && controllers.topics;

export default (app) => {

    /** ROUTING AUTH : **/
    if (usersController) {
        app.post('/login',  usersController.login);
        app.post('/signup', usersController.signUp);
        app.post('/logout', usersController.logout);
    } else {
        console.warn(unsupportedMessage('users routes'));
    }

    /** GOOGLE AUTH : **/
    if (passportConfig && passportConfig.google) {
        // Redirect the user to Google for authentication. When complete, Google
        // will redirect the user back to the application at
        // /auth/google/return
        // Authentication with google requires an additional scope param, for more info go
        // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
        app.get('/auth/google', passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));

        // Google will redirect the user to this URL after authentication. Finish the
        // process by verifying the assertion. If valid, the user will be logged in.
        // Otherwise, the authentication has failed.
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/dashboard',                   //  TODO - auth : ICI la redirection lorqu'on se connecte via google (désactivé)
                failureRedirect: '/login'
            })
        );
    }


    /** ROUTING USERS : **/
    if (topicsController) {
        app.get('/topic',           topicsController.all);
        app.post('/topic/:id',      topicsController.add);
        app.put('/topic/:id',       topicsController.update);
        app.delete('/topic/:id',    topicsController.remove);
    } else {
        console.warn(unsupportedMessage('topics routes'));
    }
};
