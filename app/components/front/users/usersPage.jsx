import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import UsersList from './usersList/usersList';


class UsersPage extends Component {
    render() {
        const { users } = this.props;

        return (
            <div>
                <h1>Liste des utilisateurs</h1>

                <UsersList usersList={users}/>

            </div>
        );
    }
}

UsersPage.propTypes = {
    users: PropTypes.array.isRequired
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        users: state.usersList.users    // [{}, {}, {}]
        // userMe: state.usersMe.me     // {}
    };
}

export default connect(mapStateToProps, null)(UsersPage);
