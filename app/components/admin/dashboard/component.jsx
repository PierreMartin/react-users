import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import AddCours from './actions/addCours/add';
import CoursList from './coursList/coursList';
import { createCours, typingCreateCourAction, addStarCourse, destroyCours } from '../../../actions/courses';


class Dashboard extends Component {
    render() {
        const {typingCreateCourState, courses, typingCreateCourAction, createCours, destroyCours, addStarCourse } = this.props;
        return (
            <div>

                <AddCours
										typingCreateCourAction={typingCreateCourAction}   // 1) for update the new state
										typingCreateCourState={typingCreateCourState} 		// 2) from new state in REAL TIME - for the displaying in the fields
                    createCours={createCours}     										// 3) at SUBMIT - contains 'typingCreateCourState'
                />

                <CoursList
                    courses={courses}
                    addStar={addStarCourse}
                    destroyCours={destroyCours}
                />

            </div>
        );
    }
}

Dashboard.propTypes = {
    courses: PropTypes.array.isRequired,
		typingCreateCourAction: PropTypes.func.isRequired,
		typingCreateCourState: PropTypes.string,
    createCours: PropTypes.func.isRequired,
    destroyCours: PropTypes.func.isRequired,
    addStarCourse: PropTypes.func.isRequired
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        courses: state.cours.courses,
				typingCreateCourState: state.cours.typingCreateCourState
    };
}


/**           { les datas - reducers }  {                  les actions                }             **/
export default connect(mapStateToProps, {createCours, typingCreateCourAction, addStarCourse, destroyCours})(Dashboard);
