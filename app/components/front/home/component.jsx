import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import CoursList from './coursList/coursList';


class Home extends Component {
    render() {
        const { topics } = this.props;

        return (
            <div>
                <h1>Bienvenue</h1>

                <CoursList topics={topics}/>

            </div>
        );
    }
}

Home.propTypes = {
    topics: PropTypes.array.isRequired
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        topics: state.topic.topics
    };
}

export default connect(mapStateToProps, null)(Home);
