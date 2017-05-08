import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import AddCour from './actions/addCours/add';
// import MyCours from './MyCours/MyCours';
// import { createCours, typing, destroyCours } from '../../../actions/courses';


class MyProfilPage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>

                {/*<AddCour
                    newCoursValue={newCoursValue}
                    typing={typing}
                    createCours={createCours}
                />*/}

                {/*<MyCours
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
