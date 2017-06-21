import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/style';
import FormEditUser from './form';
import { typingUpdateUserAction, updateUserAction } from '../../../actions/userAuth';

// const cx = classNames.bind(styles);


class UserEditPage extends Component {
	render() {
		const { userObj, updateUserAction, typingUpdateUserState, typingUpdateUserAction } = this.props;

		return (
			<div>
				<h1>Completer mon profil</h1>

				<FormEditUser
					userObj={userObj} 																	// from new state NOT in real time - after the SUBMIT action

					typingUpdateUserAction={typingUpdateUserAction}			// 1) for update the new state
					typingUpdateUserState={typingUpdateUserState}				// 2) from new state in REAL TIME for the displaying in the fields
					updateUser={updateUserAction}												// 3) at SUBMIT - contains 'typingUpdateUserState'    || POUR L'INSTANT ON A  => updateUser({email, name, picture, id: _id})
				/>

			</div>
		);
	}
}

UserEditPage.propTypes = {
	userObj: PropTypes.object.isRequired,
	typingUpdateUserAction: PropTypes.func.isRequired,
	typingUpdateUserState: PropTypes.object.isRequired,
	updateUserAction: PropTypes.func
};

function mapStateToProps(state) {
	return {
		userObj: state.userAuth.userObj,
		typingUpdateUserState: state.userAuth.typingUpdateUserState
	};
}


export default connect(mapStateToProps, {updateUserAction, typingUpdateUserAction})(UserEditPage);
