import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import User from './user/user';
// import AddCour from './actions/addCours/add';
// import CoursListByUser from '../../front/home/coursList/coursList';


class userSinglePage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>

                <User
                    email={user.email}
                    name={user.name}
                    gender={user.gender}
                    picture={user.picture}
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
    user: PropTypes.object.isRequired
};


function mapStateToProps(state) {
    return {
        user: state.user.userSingle
    };
}


export default connect(mapStateToProps, null)(userSinglePage);
