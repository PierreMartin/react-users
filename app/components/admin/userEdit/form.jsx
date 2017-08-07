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

    // ########################## we set only the fields changed ##########################
		const data = {};

    // ###### fields requied ######
		const fieldsListRequired = ['email', 'password', 'firstName', 'lastName'];
    for (let i = 0; i < fieldsListRequired.length; i++) {
      const fieldRequired = fieldsListRequired[i];

      if (typeof typingUpdateUserState[fieldRequired] !== 'undefined') {
        // if field changed :
        data[fieldRequired] = typingUpdateUserState[fieldRequired] !== '' ? typingUpdateUserState[fieldRequired] : null;
      } else if ((typeof typingUpdateUserState[fieldRequired] === 'undefined' && typeof userObj[fieldRequired] === 'undefined' || userObj[fieldRequired] === '')) {
        // if field not changed AND undefined in database :
        data[fieldRequired] = null;
      }
    }

    if (typeof typingUpdateUserState.birthdateYear !== 'undefined' || typeof typingUpdateUserState.birthdateMonth !== 'undefined' || typeof typingUpdateUserState.birthdateDay !== 'undefined') {
      data.birthDateYear = (typeof typingUpdateUserState.birthdateYear !== 'undefined' ? typingUpdateUserState.birthdateYear : birthDateState.year) || null;
      data.birthDateMonth = (typeof typingUpdateUserState.birthdateMonth !== 'undefined' ? typingUpdateUserState.birthdateMonth : birthDateState.month) || null;
      data.birthDateDay = (typeof typingUpdateUserState.birthdateDay !== 'undefined' ? typingUpdateUserState.birthdateDay : birthDateState.day) || null;
    } else if (
			(typeof typingUpdateUserState.birthdateYear === 'undefined' && typeof birthDateState.year === 'undefined' || birthDateState.year === '') ||
			(typeof typingUpdateUserState.birthDateMonth === 'undefined' && typeof birthDateState.month === 'undefined' || birthDateState.month === '') ||
			(typeof typingUpdateUserState.birthDateDay === 'undefined' && typeof birthDateState.day === 'undefined' || birthDateState.day === '')
		) {
      data.birthDateYear = null;
      data.birthDateMonth = null;
      data.birthDateDay = null;
		}

    // ###### fields NOT requied ######
    if (typeof typingUpdateUserState.gender !== 'undefined') {
      data.gender = typingUpdateUserState.gender;
    }

    // ###### update - request : ######
		if (_id && Object.keys(data).length > 0) {
      updateUser(data, _id);
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
			<div>
				<h2>Profil et infos publique</h2>
				<form className='form-horizontal' onSubmit={this.handleOnSubmit}>
					<TextField ref="email" name="email" defaultValue={this.isChanged.email ? typingUpdateUserState.email : userObj.email} floatingLabelText="Email" type="email" onChange={this.handleInputChange} errorText={missingRequiredField.email ? 'Saisis ton email' : ''} /><br />
					<TextField ref="password" name="password" defaultValue={this.isChanged.password ? typingUpdateUserState.password : ''} floatingLabelText="Change ton mot de passe" type="password" onChange={this.handleInputChange} errorText={missingRequiredField.password ? 'Saisis ton mot de passe' : ''} /><br />
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
			</div>
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
