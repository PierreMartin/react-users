import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/entrybox';

// const cx = classNames.bind(styles);

export default class FormEditUser extends Component {
	constructor(props) {
		super(props);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleOnSubmit 		= this.handleOnSubmit.bind(this);
		this.isChanged = {};
	}

	handleInputChange(event) {
		this.isChanged[event.target.name] = true;
    const { typingUpdateUserAction } = this.props;
		typingUpdateUserAction(event.target.name, event.target.value);
  }

	handleOnSubmit(event) {
		event.preventDefault();

		const { updateUser, userObj: { _id }, userObj } = this.props;

		const email = (ReactDOM.findDOMNode(this.refs.email).value !== '') ? ReactDOM.findDOMNode(this.refs.email).value : userObj.email;
		const name = ReactDOM.findDOMNode(this.refs.name).value;
		const picture = ReactDOM.findDOMNode(this.refs.picture).value;

		if (email !== '') {
			updateUser({email, name, picture, id: _id});
		}

		this.isChanged[event.target.name] = false;
	}

	render() {
		const { userObj, typingUpdateUserState } = this.props;

		return (
			<form className='form-horizontal' onSubmit={this.handleOnSubmit}>

				<div className="form-group">
					<label className="col-sm-2 control-label">Email</label>
					<div className="col-sm-10">
						<input type="email" ref="email" name="email" className="form-control" placeholder="Votre email" value={this.isChanged.email ? typingUpdateUserState.email : userObj.email} onChange={this.handleInputChange} />
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-2 control-label">Name</label>
					<div className="col-sm-10">
						<input type="text" ref="name" name="name" className="form-control" placeholder="Votre nom" value={this.isChanged.name ? typingUpdateUserState.name : userObj.name} onChange={this.handleInputChange} />
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-2 control-label">Picture</label>
					<div className="col-sm-10">
						<input type="text" ref="picture" name="picture" className="form-control" placeholder="Test/aaa/bbb" value={this.isChanged.picture ? typingUpdateUserState.picture : userObj.picture} onChange={this.handleInputChange} />
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
	typingUpdateUserState: PropTypes.object.isRequired
};
