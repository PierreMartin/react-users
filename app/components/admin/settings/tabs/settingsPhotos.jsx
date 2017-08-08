import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { typingUpdateUserAction, updateUserAction } from '../../../../actions/userAuth';

import classNames from 'classnames/bind';
import stylesMain from '../../../../css/main';
import stylesSetting from '../css/style';
const styles = Object.assign({}, stylesMain, stylesSetting);
const cx = classNames.bind(styles);


class SettingsProfil extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleOnSubmit 		= this.handleOnSubmit.bind(this);
  }

  handleInputChange(event) {
    const { typingUpdateUserAction } = this.props;
    typingUpdateUserAction(event.target.name, event.target.value);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { userAuth, updateUserAction, typingUpdateUserState } = this.props;
    const userObj = userAuth.userObj;
    const _id = userAuth.userObj._id;


    var test = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    test.append("data", imagedata);
    debugger;



    // ########################## we set only the fields changed ##########################
    const data = {};

    // ###### fields NOT requied ######
    /*if (typeof typingUpdateUserState.gender !== 'undefined') {
      data.gender = typingUpdateUserState.gender;
    }*/

    // ###### update - request : ######
    if (_id && Object.keys(data).length > 0) {
      updateUserAction(data, _id);
    }

  }

  /*handleUploadFile = (event) => {
    debugger;
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware

  };*/

  render() {
    const { userAuth, typingUpdateUserState, missingRequiredField, typingUpdateUserAction } = this.props;
    const userObj = userAuth.userObj;
    const message = userAuth.message;

    const divStyle = {
      padding: '20px',
      backgroundColor: '#4a4b4e',
      marginBottom: '15px'
    };

    return (
      <div>
        <h2>Paramètres du profil</h2>

        <form className={cx('form-horizontal')} onSubmit={this.handleOnSubmit} action="" method="post" encType="multipart/form-data" >
          <img src="" alt="avatar" style={divStyle} />
          <input type="file" name="fileName" />

          <p className={cx('message', {'message-show': message && message.length > 0})}>{message}</p>
          <RaisedButton label="Valider" type="submit" />
        </form>
      </div>
    );
  }
}

SettingsProfil.propTypes = {
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


export default connect(mapStateToProps, {updateUserAction, typingUpdateUserAction})(SettingsProfil);
