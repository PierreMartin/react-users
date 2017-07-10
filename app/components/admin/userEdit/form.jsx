import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import styles from './css/entrybox';

// const cx = classNames.bind(styles);

export default class FormEditUser extends Component {
	constructor(props) {
		super(props);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleOnSubmit 		= this.handleOnSubmit.bind(this);
		this.fields = [];
		this.isChanged = {};
	}

	handleInputChange(event) {
		this.isChanged[event.target.name] = true;
		this.fields.push(event.target.name);
    const { typingUpdateUserAction } = this.props;
		typingUpdateUserAction(event.target.name, event.target.value);
  }

	handleOnSubmit(event) {
		event.preventDefault();
		const { updateUser, userObj: { _id }, userObj, typingUpdateUserState } = this.props;

		const email = (typeof typingUpdateUserState.email !== 'undefined' ? typingUpdateUserState.email : userObj.email) || false;
		const firstName = (typeof typingUpdateUserState.firstName !== 'undefined' ? typingUpdateUserState.firstName : userObj.firstName) || '';
		const picture = (typeof typingUpdateUserState.picture !== 'undefined' ? typingUpdateUserState.picture : userObj.picture) || '';
		const gender = (typeof typingUpdateUserState.gender !== 'undefined' ? typingUpdateUserState.gender : userObj.gender) || 'homme';

		// update - request :
		if (email && _id) {
			updateUser({email, firstName, picture, gender}, _id); // set the names from the model
		}

		// set all 'this.isChanged' to false :
		for (var i = 0; i < this.fields.length; i++) {
			this.isChanged[this.fields[i]] = false;
		}
		this.fields = [];
	}

	render() {
		const { userObj, typingUpdateUserState } = this.props;

		return (
			<form className='form-horizontal' onSubmit={this.handleOnSubmit}>
				<TextField ref="email" name="email" defaultValue={this.isChanged.email ? typingUpdateUserState.email : userObj.email} floatingLabelText="Email" type="email" onChange={this.handleInputChange}/><br />
				<TextField ref="firstName" name="firstName" defaultValue={this.isChanged.firstName ? typingUpdateUserState.firstName : userObj.firstName} floatingLabelText="Nom" onChange={this.handleInputChange}/><br />
				<TextField ref="picture" name="picture" defaultValue={this.isChanged.picture ? typingUpdateUserState.picture : userObj.picture} floatingLabelText="Avatar" onChange={this.handleInputChange}/><br />
				{/*<TextField hintText="Password Field" floatingLabelText="Password" type="password"/><br />*/}
				<RadioButtonGroup ref="gender" name="gender" defaultSelected={this.isChanged.gender ? typingUpdateUserState.gender : userObj.gender} floatingLabelText="Genre" onChange={this.handleInputChange}>
					<RadioButton value="homme" label="Homme"/>
					<RadioButton value="femme" label="Femme"/>
				</RadioButtonGroup>

				<RaisedButton label="Valider" type="submit" />
			</form>
		);
	}
}

FormEditUser.propTypes = {
	updateUser: PropTypes.func,
  userObj: PropTypes.object.isRequired,
	typingUpdateUserState: PropTypes.object.isRequired
};
