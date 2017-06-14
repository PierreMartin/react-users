import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/style';
import FormEditUser from './form';
import { typingEmailAction, updateUserAction } from '../../../actions/userAuth';

// const cx = classNames.bind(styles);


class UserEditPage extends Component {
	render() {
		const { userObj, updateUserAction, formValuesOnUpdateUser, typingEmailAction } = this.props;

		return (
			<div>
				<h1>Completer mon profil</h1>

				<FormEditUser
					userObj={userObj} 																	// from new state NOT in real time - after the SUBMIT action

					// SEARCH onchange on many fields redux

					typingEmailAction={typingEmailAction}								// 1) for update the new state
					// typingNameAction={typingNameAction}									// 1) for update the new state
					// typingPictureAction={typingPictureAction}						// 1) for update the new state

					formValuesOnUpdateUser={formValuesOnUpdateUser}			// 2) from new state in REAL TIME for the displaying in the fields
					updateUser={updateUserAction}												// 3) at SUBMIT - contains 'formValuesOnUpdateUser'    || POUR L'INSTANT ON A  => updateUser({email, name, picture, id: _id})
				/>

			</div>
		);
	}
}

UserEditPage.propTypes = {
	userObj: PropTypes.object.isRequired,
  typingEmailAction: PropTypes.func.isRequired,
  formValuesOnUpdateUser: PropTypes.object.isRequired,
	updateUserAction: PropTypes.func
};

function mapStateToProps(state) {
	return {
		userObj: state.userAuth.userObj,
    formValuesOnUpdateUser: state.userAuth.formValuesOnUpdateUser
	};
}


export default connect(mapStateToProps, {updateUserAction, typingEmailAction})(UserEditPage);
