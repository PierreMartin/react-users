import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from './user/css/user';
import User from './user/user';
// import AddCour from './actions/addCours/add';
// import CoursListByUser from '../../front/home/coursList/coursList';
const cx = classNames.bind(styles);


class userSinglePage extends Component {
    render() {
        const { userSingle, userAuth } = this.props;

        let buttonEditNode = '';

        if (userSingle._id === userAuth._id) {
          buttonEditNode = <Link to={'/user/edit/' + userAuth._id} className={cx('user-links')}><button>Editer mon profil</button></Link>;
        }

        return (
            <div>
                {buttonEditNode}

                <User
                    email={userSingle.email}
                    name={userSingle.name}
                    gender={userSingle.gender}
                    picture={userSingle.picture}
                />

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
  userAuth: PropTypes.object
};


function mapStateToProps(state) {
    return {
      userSingle: state.user.userSingle,
      userAuth: state.userAuth.userObj
    };
}


export default connect(mapStateToProps, null)(userSinglePage);
