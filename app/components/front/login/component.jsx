import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode, typingLoginSignupUserAction } from '../../../actions/userAuth';
import styles from './css/style';
import hourGlassSvg from './images/hourglass.svg';
import Birthdate from '../../common/birthdate';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const cx = classNames.bind(styles);


class LoginOrRegister extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit     = this.handleOnSubmit.bind(this);
        this.handleInputChange  = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { typingLoginSignupUserAction } = this.props;
        typingLoginSignupUserAction(event.target.name, event.target.value);
    }

    handleOnSubmit(event) {
        event.preventDefault();

        const { manualLogin, signUp, userAuth: { isLogin }, typingLoginSignupUserState } = this.props;
        const email = typingLoginSignupUserState.email;
        const password = typingLoginSignupUserState.password;

        // Login :
        if (isLogin) {
            manualLogin({email, password});
        // Signup :
        } else {
            const firstName = typingLoginSignupUserState.firstName;
            const lastName = typingLoginSignupUserState.lastName;

            let birthDate = '';
            const birthdateYear = typingLoginSignupUserState.birthdateYear;
            const birthdateMonth = typingLoginSignupUserState.birthdateMonth;
            const birthdateDay = typingLoginSignupUserState.birthdateDay;
            if (birthdateYear && birthdateMonth && birthdateDay) {
              birthDate = birthdateYear + ' ' + birthdateMonth + ' ' + birthdateDay;
            }
            const gender = typingLoginSignupUserState.gender;
            signUp({email, password, firstName, lastName, birthDate, gender}); // set the names from the model
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
        const { typingLoginSignupUserState, typingLoginSignupUserAction } = this.props;

        let fieldsNamesNode = '';
        let fieldsDatesAndGenderNode = '';

        if (!isLogin) {
            fieldsNamesNode = <div className={cx('nameFields-container')}>
                  <TextField ref="firstName" name="firstName" floatingLabelText="Prénom" type="text" className={cx('firstName-field')} onChange={this.handleInputChange} defaultValue={typingLoginSignupUserState.firstName} />
                  <TextField ref="lastName" name="lastName" floatingLabelText="Nom" type="text" className={cx('lastName-field')} onChange={this.handleInputChange} defaultValue={typingLoginSignupUserState.lastName} />
            </div>;

            fieldsDatesAndGenderNode = <div>
                <Birthdate typingLoginSignupUserAction={typingLoginSignupUserAction} typingLoginSignupUserState={typingLoginSignupUserState} label="Date de naissance" />

                <div className={cx('form-gender-container')}>
                    <label htmlFor="gender">Sexe</label>
                    <RadioButtonGroup ref="gender" name="gender" className={cx('input-gender-container')} floatingLabelText="Genre" onChange={this.handleInputChange} defaultValue={typingLoginSignupUserState.gender} >
                        <RadioButton value="homme" label="Homme" className={cx('gender-input')} />
                        <RadioButton value="femme" label="Femme" className={cx('gender-input')} />
                    </RadioButtonGroup>
                </div>
            </div>;
        }

        return (
            <div className={cx('login', {waiting: isWaiting})}>
								{ this.renderHeader() }
								<img className={cx('loading')} src={hourGlassSvg}/>

								<div className={cx('email-container')}>
										<form className={cx('form-horizontal')} onSubmit={this.handleOnSubmit}>
                        {fieldsNamesNode}
												<TextField ref="email" name="email" floatingLabelText="Email" type="email" fullWidth={true} onChange={this.handleInputChange} defaultValue={typingLoginSignupUserState.email} /><br />
												<TextField ref="password" name="password" floatingLabelText="Mot de passe" type="password" fullWidth={true} onChange={this.handleInputChange} defaultValue={typingLoginSignupUserState.password} /><br />
                        {fieldsDatesAndGenderNode}
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
    toggleLoginMode: PropTypes.func.isRequired,
    typingLoginSignupUserAction: PropTypes.func.isRequired,
    typingLoginSignupUserState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth,
        typingLoginSignupUserState: state.userAuth.typingLoginSignupUserState
    };
}

export default connect(mapStateToProps, {manualLogin, signUp, toggleLoginMode, typingLoginSignupUserAction})(LoginOrRegister);

