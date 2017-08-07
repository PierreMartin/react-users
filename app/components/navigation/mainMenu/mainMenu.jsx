import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '../../../actions/userAuth';
import classNames from 'classnames/bind';
import styles from './css/style';

const cx = classNames.bind(styles);


const Navigation = ({ userAuth, logOut }) => {
    return (
        <nav className={cx('navigation')} role="navigation">
            <Link to="/" className={cx('item', 'logo')} activeClassName={cx('active')}>Home</Link>
            { userAuth.authenticated ? (<Link to="/userslist" className={cx('item')} activeClassName={cx('active')}>Users</Link>) : ''}
            { userAuth.authenticated ? (<Link to="/dashboard" className={cx('item')} >Dashboard</Link>) : ''}
            { userAuth.authenticated ? (<Link to={'/user/' + userAuth.userObj._id} className={cx('item')} activeClassName={cx('active')}>My profil</Link>) : ''}
            <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
            { userAuth.authenticated ? (<Link onClick={logOut} className={cx('item')} to="/">Logout</Link>) : (<Link className={cx('item')} to="/login">Log in</Link>)}
        </nav>
    );
};

Navigation.propTypes = {
    userAuth: PropTypes.object,
    logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth
    };
}

export default connect(mapStateToProps, {logOut})(Navigation);
