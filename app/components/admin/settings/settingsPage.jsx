import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationSetting } from './settingsMenu/settings';

// import classNames from 'classnames/bind';
// import styles from './css/style';
// const cx = classNames.bind(styles);


class SettingsPage extends Component {
	render() {
		const { userAuth } = this.props;

		return (
			<div className="container">
				<h1>Paramètres généraux</h1>
				<hr/>

				<div className="row">
					<div className="col-xs-3">
						<NavigationSetting userAuth={userAuth} />
					</div>

					<div className="col-xs-9">
            { this.props.children }
					</div>
				</div>

			</div>
		);
	}
}

SettingsPage.propTypes = {
  userAuth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
    userAuth: state.userAuth
	};
}


export default connect(mapStateToProps, null)(SettingsPage);
