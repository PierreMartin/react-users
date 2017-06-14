import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/entrybox';

// const cx = classNames.bind(styles);

export default class FormEditUser extends Component {
	constructor(props) {
		super(props);
    this.onChangeEmail   		= this.onChangeEmail.bind(this);
    this.onChangeName 			= this.onChangeName.bind(this);
    this.onChangePicture 		= this.onChangePicture.bind(this);

    this.handleOnSubmit 		= this.handleOnSubmit.bind(this);
	}


  onChangeEmail(event) {
    const { typingEmailAction } = this.props;
    typingEmailAction(event.target.value);
  }

  onChangeName(event) {
    const { typingNameAction } = this.props;
    typingNameAction(event.target.value);
  }

  onChangePicture(event) {
    const { typingPictureAction } = this.props;
    typingPictureAction(event.target.value);
  }


	handleOnSubmit(event) {
		event.preventDefault();

		const { updateUser, userObj: { _id }, userObj } = this.props;

		this.email = (ReactDOM.findDOMNode(this.refs.email).value !== '') ? ReactDOM.findDOMNode(this.refs.email).value : userObj.email;
		const name = ReactDOM.findDOMNode(this.refs.name).value;
		const picture = ReactDOM.findDOMNode(this.refs.picture).value;

		if (email !== '') {
			updateUser({email, name, picture, id: _id});
		}
	}

	render() {
		const { userObj, formValuesOnUpdateUser } = this.props;

		return (
			<form className='form-horizontal' onSubmit={this.handleOnSubmit}>

				<div className="form-group">
					<label className="col-sm-2 control-label">Email</label>
					<div className="col-sm-10">
						<input type="email" ref="email" className="form-control" placeholder="Pierre" value={userObj.email || formValuesOnUpdateUser.email} onChange={this.onChangeEmail} />
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-2 control-label">Name</label>
					<div className="col-sm-10">
						<input type="text" ref="name" className="form-control" placeholder="Votre nom" value={userObj.name || formValuesOnUpdateUser.name} onChange={this.onChangeName} />
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-2 control-label">Picture</label>
					<div className="col-sm-10">
						<input type="text" ref="picture" className="form-control" placeholder="Test/aaa/bbb" value={userObj.picture || formValuesOnUpdateUser.picture} onChange={this.onChangePicture} />
					</div>
				</div>

				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
						<button type="submit" className="btn btn-default">Valider</button>
					</div>
				</div>

			</form>
		);
	}
}

FormEditUser.propTypes = {
	updateUser: PropTypes.func,
  userObj: PropTypes.object.isRequired,
  formValuesOnUpdateUser: PropTypes.object.isRequired
};
