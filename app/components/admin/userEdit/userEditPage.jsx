import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/style';
import FormEditUser from './form';
import { NavigationSetting } from '../../navigation/settings';
import { typingUpdateUserAction, updateUserAction } from '../../../actions/userAuth';
import { Link } from 'react-router';
// const cx = classNames.bind(styles);


class UserEditPage extends Component {
	render() {
		const { userAuth, updateUserAction, typingUpdateUserState, typingUpdateUserAction, missingRequiredField } = this.props;

		return (
			<div>
				<h1>Paramètres généraux du compte</h1>

				<NavigationSetting />

				<FormEditUser
					userAuth={userAuth}
					missingRequiredField={missingRequiredField}

					typingUpdateUserAction={typingUpdateUserAction}			// 1) for update the new state
					typingUpdateUserState={typingUpdateUserState}				// 2) from new state in REAL TIME for the displaying in the fields
					updateUser={updateUserAction}												// 3) at SUBMIT - contains 'typingUpdateUserState'    || POUR L'INSTANT ON A  => updateUser({email, name, picture, id: _id})
				/>

			</div>
		);
	}
}

UserEditPage.propTypes = {
  userAuth: PropTypes.object.isRequired,
	typingUpdateUserAction: PropTypes.func.isRequired,
	typingUpdateUserState: PropTypes.object.isRequired,
	updateUserAction: PropTypes.func,
  missingRequiredField: PropTypes.object
};

function mapStateToProps(state) {
	return {
    userAuth: state.userAuth,
		typingUpdateUserState: state.userAuth.typingUpdateUserState,
    missingRequiredField: state.userAuth.missingRequiredField
	};
}


export default connect(mapStateToProps, {updateUserAction, typingUpdateUserAction})(UserEditPage);
