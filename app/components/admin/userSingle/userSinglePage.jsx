import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { chatBoxOpenAction } from '../../../actions/chat';
import User from './user/user';
import RaisedButton from 'material-ui/RaisedButton';
// import AddCour from './actions/addCours/add';
// import CoursListByUser from '../../front/home/coursList/coursList';

import classNames from 'classnames/bind';
import styles from './user/css/user';
const cx = classNames.bind(styles);


class userSinglePage extends Component {
		constructor(props) {
				super(props);
				this.handleClickOpenChatBox = this.handleClickOpenChatBox.bind(this);
		}

		handleClickOpenChatBox() {
				const { chatBoxOpenAction } = this.props;
				chatBoxOpenAction(true);
		}

    render() {
        const { userSingle, userObj } = this.props;

        let buttonEditNode = '';
        let buttonChatNode = '';

        if (userSingle._id === userObj._id) {
          buttonEditNode = <Link to={'/settings/'} className={cx('user-links')}><RaisedButton label="Paramètres de mon compte" /></Link>;
        }

        if (userSingle._id !== userObj._id) {
					buttonChatNode = <RaisedButton label="Contacter" onClick={this.handleClickOpenChatBox} />;
        }

        return (
            <div>
                {buttonEditNode}
                {buttonChatNode}

								<hr/>
								<h2>Profil de l'utilisateur</h2>
                <User
									userSingle={userSingle}
									userObj={userObj}
								/>

								<hr/>
								<h2>Cours de l'utilisateur</h2>
                {/*<AddCour
                    newCoursValue={newCoursValue}
                    typing={typing}
                    createCours={createCours}
                />*/}

                {/*<CoursListByUser
                    courses={courses}
                    destroyCours={destroyCours}
                />*/}

            </div>
        );
    }
}

userSinglePage.propTypes = {
  userSingle: PropTypes.object.isRequired,
	userObj: PropTypes.object,
	chatBoxOpenAction: PropTypes.func
};


function mapStateToProps(state) {
    return {
      userSingle: state.user.userSingle,
			userObj: state.userAuth.userObj
    };
}


export default connect(mapStateToProps, { chatBoxOpenAction })(userSinglePage);
