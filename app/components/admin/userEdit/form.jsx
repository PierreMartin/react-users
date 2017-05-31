import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from './css/entrybox';

// const cx = classNames.bind(styles);

export default class FormEditUser extends Component {
	constructor(props) {
		super(props);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnSubmit(event) {
		event.preventDefault();

		const { updateUser, userObj: { _id }, userObj, formValuesOnUpdate } = this.props;

		const email = (ReactDOM.findDOMNode(this.refs.email).value !== '') ? ReactDOM.findDOMNode(this.refs.email).value : userObj.email;
		const name = ReactDOM.findDOMNode(this.refs.name).value;
		const picture = ReactDOM.findDOMNode(this.refs.picture).value;

		if (email !== '') {
			updateUser({email, name, picture, id: _id});
		}
	}

	render() {
		const { userObj, formValuesOnUpdate } = this.props; // value={formValuesOnUpdate.email}

		return (
			<form className='form-horizontal' onSubmit={this.handleOnSubmit}>

				<div className="form-group">
					<label className="col-sm-2 control-label">Email</label>
					<div className="col-sm-10">
						<input type="email" ref="email" className="form-control" id="inputEmail3" placeholder={userObj.email} />
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-2 control-label">Name</label>
					<div className="col-sm-10">
						<input type="text" ref="name" className="form-control" id="inputPassword3" placeholder={userObj.name}/>
					</div>
				</div>

				<div className="form-group">
					<label className="col-sm-2 control-label">Picture</label>
					<div className="col-sm-10">
						<input type="text" ref="picture" className="form-control" id="inputPassword3" placeholder={userObj.picture}/>
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
  userObj: PropTypes.object.isRequired
};
