import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../../../actions/userAuth';
import styles from './css/style';
import hourGlassSvg from './images/hourglass.svg';

const cx = classNames.bind(styles);


class LoginOrRegister extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(event) {
        event.preventDefault();

        const { manualLogin, signUp, userAuth: { isLogin } } = this.props; // 'isLogin' est l'action au clique sur le boutton 'Login'

        const email     = ReactDOM.findDOMNode(this.refs.email).value;
        const password  = ReactDOM.findDOMNode(this.refs.password).value;

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
                    <h1 className={cx('heading')}>Login with Email</h1>

                    <div className={cx('alternative')}>
                        Not what you want?
                        <a className={cx('alternative-link')} onClick={toggleLoginMode}> Register an Account</a>
                    </div>

                </div>
            );
        }

        return (
            <div className={cx('header')}>
                <h1 className={cx('heading')}>Register with Email</h1>

                <div className={cx('alternative')}>
                    Already have an account?
                    <a className={cx('alternative-link')} onClick={toggleLoginMode}> Login</a>
                </div>

            </div>
        );
    }

    render() {
        const { isWaiting, message, isLogin } = this.props.userAuth;

        return (
            <div className={cx('login', {waiting: isWaiting})}>
                <div className={cx('container')}>
                    { this.renderHeader() }
                    <img className={cx('loading')} src={hourGlassSvg}/>

                    <div className={cx('email-container')}>
                        <form onSubmit={this.handleOnSubmit}>

                            <input
                                className={cx('input')}
                                type="email"
                                ref="email"
                                placeholder="email"
                            />

                            <input
                                className={cx('input')}
                                type="password"
                                ref="password"
                                placeholder="password"
                            />

                            <p className={cx('message', {'message-show': message && message.length > 0})}>
                                {message}
                            </p>

                            <input
                                className={cx('button')}
                                type="submit"
                                value={isLogin ? 'Login' : 'Register'}
                            />

                        </form>
                    </div>

                    {/*<div className={cx('google-container')}>
                        <h1 className={cx('heading')}>Login with Google</h1>
                        <a className={cx('button')} href="/auth/google">Login with Google</a>
                    </div>*/}

                </div>
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

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({userAuth}) {
    return {
        userAuth
    };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {manualLogin, signUp, toggleLoginMode})(LoginOrRegister);
