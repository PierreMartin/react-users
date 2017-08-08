import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationSetting } from './settingsMenu/settings';

// import classNames from 'classnames/bind';
// import styles from './css/style';
// const cx = classNames.bind(styles);


export default class SettingsPage extends Component {
	render() {

		return (
			<div className="container">
				<h1>Paramètres généraux</h1>
				<hr/>

				<div className="row">
					<div className="col-xs-3">
						<NavigationSetting />
					</div>

					<div className="col-xs-9">
            { this.props.children }
					</div>
				</div>

			</div>
		);
	}
}
