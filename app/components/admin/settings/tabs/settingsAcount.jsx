import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { NavigationSetting } from '../settingsMenu/settings';
import { typingUpdateUserAction, updateUserAction } from '../../../../actions/userAuth';

import classNames from 'classnames/bind';
import stylesMain from '../../../../css/main';
import stylesSetting from '../css/style';
const styles = Object.assign({}, stylesMain, stylesSetting);
const cx = classNames.bind(styles);


class SettingsAcount extends Component {
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
    const { userAuth, updateUserAction, typingUpdateUserState } = this.props;
    const userObj = userAuth.userObj;
    const _id = userAuth.userObj._id;

    // ########################## we set only the fields changed ##########################
    const data = {};

    // ###### fields requied ######
    const fieldsListRequired = ['email', 'password'];
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

    // ###### update - request : ######
    if (_id && Object.keys(data).length > 0) {
      updateUserAction(data, _id);
    }

    // set all 'this.isChanged' to false :
    for (var i = 0; i < this.fields.length; i++) {
      this.isChanged[this.fields[i]] = false;
    }
    this.fields = [];
  }

  render() {
    const { userAuth, typingUpdateUserState, missingRequiredField } = this.props;
    const userObj = userAuth.userObj;
    const message = userAuth.message;

    return (
      <div className="container">
        <h1>Paramètres du compte</h1>
        <hr/>

        <div className="row">
          <div className="col-xs-3">
            <NavigationSetting userAuth={userAuth} />
          </div>

          <div className="col-xs-9">
            <h2>Paramètres du compte</h2>

            <form className={cx('form-horizontal')} onSubmit={this.handleOnSubmit}>
              <TextField ref="email" name="email" defaultValue={this.isChanged.email ? typingUpdateUserState.email : userObj.email} floatingLabelText="Email" type="email" onChange={this.handleInputChange} errorText={missingRequiredField.email ? 'Saisis ton email' : ''} fullWidth={true} /><br />
              <TextField ref="password" name="password" defaultValue={this.isChanged.password ? typingUpdateUserState.password : ''} floatingLabelText="Change ton mot de passe" type="password" onChange={this.handleInputChange} errorText={missingRequiredField.password ? 'Saisis ton mot de passe' : ''} fullWidth={true} /><br />

              <p className={cx('message', {'message-show': message && message.length > 0})}>{message}</p>
              <RaisedButton label="Valider" type="submit" />
            </form>

          </div>
        </div>
      </div>
    );
  }
}

SettingsAcount.propTypes = {
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


export default connect(mapStateToProps, {updateUserAction, typingUpdateUserAction})(SettingsAcount);
