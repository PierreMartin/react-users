import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from './user/css/user';
import User from './user/user';
import RaisedButton from 'material-ui/RaisedButton';
// import AddCour from './actions/addCours/add';
// import CoursListByUser from '../../front/home/coursList/coursList';
const cx = classNames.bind(styles);


class userSinglePage extends Component {
    render() {
        const { userSingle, userObj } = this.props;

        let buttonEditNode = '';

        if (userSingle._id === userObj._id) {
          buttonEditNode = <Link to={'/settings/'} className={cx('user-links')}><RaisedButton label="Paramètres de mon compte" /></Link>;
        }

        return (
            <div>
                {buttonEditNode}

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
	userObj: PropTypes.object
};


function mapStateToProps(state) {
    return {
      userSingle: state.user.userSingle,
			userObj: state.userAuth.userObj
    };
}


export default connect(mapStateToProps, null)(userSinglePage);
