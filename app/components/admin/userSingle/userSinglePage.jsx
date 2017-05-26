import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import User from './user/user';
// import AddCour from './actions/addCours/add';
// import CoursListByUser from '../../front/home/coursList/coursList';
import { getUser } from '../../../actions/users';


class userSinglePage extends Component {
    componentDidMount() {
        const { params } = this.props;
        getUser(params.id_user);
    }

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

userSinglePage.propTypes = {
    user: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        user: state.user.userSingle
    };
}


export default connect(mapStateToProps, {getUser})(userSinglePage);
