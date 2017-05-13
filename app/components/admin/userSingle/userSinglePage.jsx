import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import User from './user/user';
// import AddCour from './actions/addCours/add';
// import CoursListByUser from '../../front/home/coursList/coursList';
// import { createCours, typing, destroyCours } from '../../../actions/courses';


class MyProfilPage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>

                <User
                    email={user.email}
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

MyProfilPage.propTypes = {
    user: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
    return {
        user: state.userSingle.user
    };
}


export default connect(mapStateToProps, null)(MyProfilPage);
