import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import CoursList from './coursList/coursList';


class Home extends Component {
    render() {
        const { courses } = this.props;

        return (
            <div>
                <h1>Bienvenue</h1>

                <CoursList courses={courses}/>

            </div>
        );
    }
}

Home.propTypes = {
    courses: PropTypes.array.isRequired
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        courses: state.cours.courses
    };
}

export default connect(mapStateToProps, null)(Home);
