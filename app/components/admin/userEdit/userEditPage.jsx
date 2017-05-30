import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/style';
import FormEditUser from './form';
import { updateUser } from '../../../fetch-data';

// const cx = classNames.bind(styles);


class UserEditPage extends Component {
	render() {
		const { userObj, updateUser } = this.props;

		return (
			<div>
				<h1>Completer mon profil</h1>

				<FormEditUser
					user={userObj}
					updateUser={updateUser}
				/>

			</div>
		);
	}
}

UserEditPage.propTypes = {
	userObj: PropTypes.object.isRequired,
	updateUser: PropTypes.func
};

function mapStateToProps(state) {
	return {
		userObj: state.userAuth.userObj
	};
}


export default connect(mapStateToProps, {updateUser})(UserEditPage);
