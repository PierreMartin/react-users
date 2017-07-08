import React, { Component, PropTypes } from 'react';
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

        const email = this.refs.email.input.value;
        const password = this.refs.password.input.value;

        // Login :
        if (isLogin) {
            manualLogin({email, password});
        // Signup :
        } else {
            const firstName = this.refs.firstName.input.value;
            const lastName = this.refs.lastName.input.value;
            signUp({email, password, firstName, lastName}); // set the names from the model
        }

    }

    renderHeader() {
        const { userAuth: { isLogin } , toggleLoginMode } = this.props;

        if (isLogin) {
            return (
                <div className={cx('header')}>
                    <div className={cx('alternative')}>
                      Pas encore membre ? <a className={cx('alternative-link')} onClick={toggleLoginMode}> Inscris-toi ici</a>
                    </div>
                    <h1 className={cx('heading')}>Connection</h1>
                </div>
            );
        }

        return (
            <div className={cx('header')}>
                <div className={cx('alternative')}>
                  Déjà membre ? <a className={cx('alternative-link')} onClick={toggleLoginMode}> Connecte-toi</a>
                </div>
                <h1 className={cx('heading')}>Inscription</h1>
            </div>
        );
    }

    render() {
        const { isWaiting, message, isLogin } = this.props.userAuth;
        let fieldsForSignupNode = '';

        if (!isLogin) {
            fieldsForSignupNode = <div className={cx('nameFields-container')}>
                <TextField ref="firstName" name="firstName" floatingLabelText="Prénom" type="text" className={cx('firstName-field')} />
                <TextField ref="lastName" name="lastName" floatingLabelText="Nom" type="text" className={cx('lastName-field')} />
            </div>;
        }

        return (
            <div className={cx('login', {waiting: isWaiting})}>
								{ this.renderHeader() }
								<img className={cx('loading')} src={hourGlassSvg}/>

								<div className={cx('email-container')}>
										<form className={cx('form-horizontal')} onSubmit={this.handleOnSubmit}>
                        {fieldsForSignupNode}
												<TextField ref="email" name="email" floatingLabelText="Email" type="email" fullWidth={true} /><br />
												<TextField ref="password" name="password" floatingLabelText="Password" type="password" fullWidth={true} /><br />
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

