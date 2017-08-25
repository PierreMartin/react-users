import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const usersController       = controllers && controllers.users;
const coursesController     = controllers && controllers.courses;

/********************* Multer *******************/
var maxSize = 1000 * 1000 * 1000;

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/uploads/');
	},
	filename: function(req, file, callback) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (!err) {
				var ext = file.originalname && path.extname(file.originalname);

				if (typeof ext === 'undefined' || ext === '') {
					ext = '.jpg';
				}
				callback(null, raw.toString('hex') + Date.now() + ext.toLowerCase());
			}
		});
	}
});

const upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function(req, file, callback) {
		const typeArray = file.mimetype.split("/");
		var ext = file.originalname && path.extname(file.originalname).toLowerCase();

		if (typeArray[0] !== 'image') {
			return callback(new Error('Something went wrong'), false);
		}

		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(new Error('Only images are allowed'), false);
		}

		callback(null, true);
	}
});

export default (app) => {

    /** ROUTING USERS : **/
    if (usersController) {
        app.post('/api/login',      usersController.login);
        app.post('/api/signup',     usersController.signUp);
        app.post('/api/logout',     usersController.logout);
        app.get('/api/user/all',    usersController.all);
        app.get('/api/user/:id',    usersController.single);
        app.put('/api/user/:id',    usersController.update);
        app.post('/api/user/avatar', upload.single('formAvatar'), usersController.uploadAvatar);
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
        console.warn(unsupportedMessage('topics routes'));
    }
};
