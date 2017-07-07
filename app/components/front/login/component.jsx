import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../../../actions/userAuth';
import styles from './css/style';
import hourGlassSvg from './images/hourglass.svg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const cx = classNames.bind(styles);


class LoginOrRegister extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(event) {
        event.preventDefault();

        const { manualLogin, signUp, userAuth: { isLogin } } = this.props;

        const email     = ReactDOM.findDOMNode(this.refs.email).value;
        const password  = ReactDOM.findDOMNode(this.refs.password).value;
				debugger;

        if (isLogin) {
            manualLogin({email, password});
        } else {
            signUp({email, password});
        }
    }

    renderHeader() {
        const { userAuth: { isLogin } , toggleLoginMode } = this.props;

        if (isLogin) {
            return (
                <div className={cx('header')}>
                    <h1 className={cx('heading')}>Se connecter</h1>

                    <div className={cx('alternative')}>
                        Pas de compte créer ?
                        <a className={cx('alternative-link')} onClick={toggleLoginMode}> Créer un compte</a>
                    </div>

                </div>
            );
        }

        return (
            <div className={cx('header')}>
                <h1 className={cx('heading')}>Créer un compte</h1>

                <div className={cx('alternative')}>
                    J'ai déja un compte ?
                    <a className={cx('alternative-link')} onClick={toggleLoginMode}> Login</a>
                </div>

            </div>
        );
    }

    render() {
        const { isWaiting, message, isLogin } = this.props.userAuth;

        return (
            <div className={cx('login', {waiting: isWaiting})}>
								{ this.renderHeader() }
								<img className={cx('loading')} src={hourGlassSvg}/>

								<div className={cx('email-container')}>
										<form className='form-horizontal' onSubmit={this.handleOnSubmit}>
												<TextField ref="email" name="email" floatingLabelText="Email" type="email" /><br />
												<TextField ref="password" name="password" floatingLabelText="Password" type="password" /><br />
												<p className={cx('message', {'message-show': message && message.length > 0})}>{message}</p>

												<RaisedButton label={isLogin ? 'Login' : 'Register'} type="submit" />
										</form>
								</div>

								{/*<div className={cx('google-container')}>
										<h1 className={cx('heading')}>Login with Google</h1>
										<a className={cx('button')} href="/auth/google">Login with Google</a>
								</div>*/}
            </div>
        );
    }
}

LoginOrRegister.propTypes = {
    userAuth: PropTypes.object,
    manualLogin: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    toggleLoginMode: PropTypes.func.isRequired
};

function mapStateToProps({userAuth}) {
    return {
        userAuth
    };
}

export default connect(mapStateToProps, {manualLogin, signUp, toggleLoginMode})(LoginOrRegister);

