import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import AddCour from './actions/addCours/add';
// import MyCours from './MyCours/MyCours';
// import { createCours, typing, destroyCours } from '../../../actions/courses';


class Dashboard extends Component {
    render() {
        const { userMe } = this.props;
        return (
            <div>

                {/*<AddCour
                    newCoursValue={newCoursValue}
                    typing={typing}
                    createCours={createCours}
                />*/}

                <MyCours
                    courses={courses}
                    destroyCours={destroyCours}
                />

            </div>
        );
    }
}

Dashboard.propTypes = {
    userMe: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
    return {
        userMe: state.cours.userMe
    };
}


export default connect(mapStateToProps, null)(Dashboard);
