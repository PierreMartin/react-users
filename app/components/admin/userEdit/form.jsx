import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Birthdate from '../../common/birthdate';
import { defaultValBirthDate } from '../../common/constants';

import styles from '../../../css/main';
const cx = classNames.bind(styles);

export default class FormEditUser extends Component {
	constructor(props) {
		super(props);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleOnSubmit 		= this.handleOnSubmit.bind(this);
		this.fields = [];
		this.isChanged = {};
	}

	/**
	 * Get the the year, the month and the day from a date type (example "2009-02-23T23:00:00.000Z")
	 * @param {Date} birthDate - the date to convert
	 * @return {object} the year, month and day of the birthDate
	 * */
	birthDateForSelectField(birthDate) {
    let date = new Date(birthDate);
    const birthDateObj = {};
    birthDateObj.year = date.getFullYear();
    birthDateObj.month = date.getMonth();
    birthDateObj.day = date.getDate();

		return birthDateObj;
	}

	handleInputChange(event) {
		this.isChanged[event.target.name] = true;
		this.fields.push(event.target.name);
    const { typingUpdateUserAction } = this.props;
		typingUpdateUserAction(event.target.name, event.target.value);
  }

	handleOnSubmit(event) {
		event.preventDefault();
		const { userAuth, updateUser, typingUpdateUserState } = this.props;
		const birthDate = this.props.userAuth.userObj.birthDate;
    const userObj = userAuth.userObj;
    const _id = userAuth.userObj._id;

    // get birthDate right format :
    let birthDateState = this.birthDateForSelectField(birthDate);

		const email = (typeof typingUpdateUserState.email !== 'undefined' ? typingUpdateUserState.email : userObj.email) || '';
		const password = (typeof typingUpdateUserState.password !== 'undefined' ? typingUpdateUserState.password : userObj.password) || '';
		const firstName = (typeof typingUpdateUserState.firstName !== 'undefined' ? typingUpdateUserState.firstName : userObj.firstName) || '';
		const lastName = (typeof typingUpdateUserState.lastName !== 'undefined' ? typingUpdateUserState.lastName : userObj.lastName) || '';
		const gender = (typeof typingUpdateUserState.gender !== 'undefined' ? typingUpdateUserState.gender : userObj.gender) || 'homme';

    // dates :
    const birthDateYear = (typeof typingUpdateUserState.birthdateYear !== 'undefined' ? typingUpdateUserState.birthdateYear : birthDateState.year) || defaultValBirthDate.year;
    const birthDateMonth = (typeof typingUpdateUserState.birthdateMonth !== 'undefined' ? typingUpdateUserState.birthdateMonth : birthDateState.month) || defaultValBirthDate.month;
    const birthDateDay = (typeof typingUpdateUserState.birthdateDay !== 'undefined' ? typingUpdateUserState.birthdateDay : birthDateState.day) || defaultValBirthDate.day;

		// update - request :
		if (email && _id) {
      updateUser({email, /*password,*/ firstName, lastName, gender, birthDateYear, birthDateMonth, birthDateDay}, _id);
		}

		// set all 'this.isChanged' to false :
		for (var i = 0; i < this.fields.length; i++) {
			this.isChanged[this.fields[i]] = false;
		}
		this.fields = [];
	}

	render() {
		const { userAuth, typingUpdateUserState, missingRequiredField, typingUpdateUserAction } = this.props;
    const birthDate = this.props.userAuth.userObj.birthDate;
		const userObj = userAuth.userObj;
		const message = userAuth.message;

    // get birthDate right format :
    let birthDateState = this.birthDateForSelectField(birthDate);

		return (
			<form className='form-horizontal' onSubmit={this.handleOnSubmit}>
				<TextField ref="email" name="email" defaultValue={this.isChanged.email ? typingUpdateUserState.email : userObj.email} floatingLabelText="Email" type="email" onChange={this.handleInputChange} errorText={missingRequiredField.email ? 'Saisis ton email' : ''} /><br />
				{/*<TextField ref="password" name="password" defaultValue={this.isChanged.password ? typingUpdateUserState.password : userObj.password} floatingLabelText="Mot de passe" type="password" onChange={this.handleInputChange} errorText={missingRequiredField.password ? 'Saisis ton mot de passe' : ''} /><br />*/}
				<TextField ref="firstName" name="firstName" defaultValue={this.isChanged.firstName ? typingUpdateUserState.firstName : userObj.firstName} floatingLabelText="Prénom" onChange={this.handleInputChange} errorText={missingRequiredField.firstName ? 'Saisis ton prénom' : ''} /><br />
				<TextField ref="lastName" name="lastName" defaultValue={this.isChanged.lastName ? typingUpdateUserState.lastName : userObj.lastName} floatingLabelText="Nom" onChange={this.handleInputChange} errorText={missingRequiredField.lastName ? 'Saisis ton nom' : ''} /><br />

				<Birthdate defaultVal={defaultValBirthDate} currentValue={birthDateState} typingLoginSignupUserAction={typingUpdateUserAction} typingLoginSignupUserState={typingUpdateUserState} label="Date de naissance" missingRequiredField={missingRequiredField} />

				<RadioButtonGroup ref="gender" name="gender" defaultSelected={this.isChanged.gender ? typingUpdateUserState.gender : userObj.gender} floatingLabelText="Genre" onChange={this.handleInputChange}>
					<RadioButton value="homme" label="Homme"/>
					<RadioButton value="femme" label="Femme"/>
				</RadioButtonGroup>

				<p className={cx('message', {'message-show': message && message.length > 0})}>{message}</p>
				<RaisedButton label="Valider" type="submit" />
			</form>
		);
	}
}

FormEditUser.propTypes = {
	updateUser: PropTypes.func,
  userAuth: PropTypes.object.isRequired,
	typingUpdateUserState: PropTypes.object.isRequired,
  typingUpdateUserAction: PropTypes.func.isRequired,
  missingRequiredField: PropTypes.object
};
