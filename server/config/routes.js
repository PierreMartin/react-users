import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController				= controllers && controllers.users;
const coursesController			= controllers && controllers.courses;
const chatController				= controllers && controllers.chat;

export default (app) => {

    /** ROUTING USERS : **/
    if (usersController) {
        app.post('/api/login',      usersController.login);
        app.post('/api/signup',     usersController.signUp);
        app.post('/api/logout',     usersController.logout);
        app.get('/api/user/all',    usersController.all);
        app.get('/api/user/:id',    usersController.single);
        app.put('/api/user/:id',    usersController.update);
        app.post('/api/user/avatar/:id/:avatarId', usersController.uploadAvatarMulter, usersController.uploadAvatar);
        app.put('/api/user/avatar/:idUser/', usersController.updateDefaultAvatar);
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


    /** ROUTING COURSES : **/
    if (coursesController) {
        app.get('/api/cours',           coursesController.all);
        app.post('/api/cours/:id',      coursesController.add);
        app.put('/api/cours/:id',       coursesController.update);
        app.delete('/api/cours/:id',    coursesController.remove);
    } else {
        console.warn(unsupportedMessage('cours routes'));
    }

		/** ROUTING CHAT : **/
		if (chatController) {
				app.post('/api/tchat/channel',   chatController.addChannel);
		} else {
				console.warn(unsupportedMessage('chat routes'));
		}

};
