import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import AddCours from './actions/addCours/add';
import CoursList from './coursList/coursList';
import { createCours, typing, addStarCourse, destroyCours, fetchTopics } from '../../../actions/courses';


class Dashboard extends Component {

    // {newCoursValue, ... } = this.props;   => valeur retourné des fonctions des reducers ET des actions
    render() {
        const {newCoursValue, courses, typing, createCours, destroyCours, addStarCourse } = this.props;
        return (
            <div>

                <AddCours
                    newCoursValue={newCoursValue}
                    typing={typing}
                    createCours={createCours}
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
    typing: PropTypes.func.isRequired,
    createCours: PropTypes.func.isRequired,
    destroyCours: PropTypes.func.isRequired,
    addStarCourse: PropTypes.func.isRequired,
    newCoursValue: PropTypes.string
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        courses: state.cours.courses, /** 'state.cours.courses'  défini ici les propriétés et valeurs de notre state + cette partie du state sera utilisé dans les 'reducers' **/
        newCoursValue: state.cours.newCoursValue
    };
}


/**           { les datas - reducers }  {                  les actions                }                                 **/
export default connect(mapStateToProps, {createCours, typing, addStarCourse, destroyCours})(Dashboard);