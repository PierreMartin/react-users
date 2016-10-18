import express from 'express';
import webpack from 'webpack';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
const App = require('../public/assets/server');
const app = express();


// Connection à MongoDB par mongoose + Models + Controllers + Sessions + Passwords (Auth) :
connect();

// Pour la persistence d'authentification par password :
passportConfig();


// Le hot-reload de Webpack :
if (ENV === 'development') {
    const webpackDevConfig = require('../webpack/webpack.config.dev-client');
    const compiler = webpack(webpackDevConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackDevConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}


// point de départ (express) :
expressConfig(app);

// les routes :
routesConfig(app);


app.get('*', App.default);

app.listen(app.get('port'));
