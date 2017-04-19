import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import AddCours from './actions/addCours/add';
import CoursList from './coursList/coursList';
import { createTopic, typing, addStarCourse, destroyTopic, fetchTopics } from '../../../actions/topics';
import styles from '../../../css/components/vote';

const cx = classNames.bind(styles);

class Dashboard extends Component {

    // {newTopic, ... } = this.props;   => valeur retourné des fonctions des reducers ET des actions
    render() {
        const {newTopic, topics, typing, createTopic, destroyTopic, addStarCourse } = this.props;
        return (
            <div className={cx('vote')}>

                <AddCours
                    topic={newTopic}
                    onEntryChange={typing}
                    onEntrySave={createTopic}
                />

                <CoursList
                    topics={topics}
                    addStar={addStarCourse}
                    onDestroy={destroyTopic}
                />

            </div>
        );
    }
}

Dashboard.propTypes = {
    topics: PropTypes.array.isRequired,
    typing: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired,
    addStarCourse: PropTypes.func.isRequired,
    newTopic: PropTypes.string
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        topics: state.topic.topics, /** 'state.topic.topics'  défini ici les key + valeurs de notre state + cette partis du state sera utilisé dans les 'reducers' **/
        newTopic: state.topic.newTopic
    };
}


/**           { les datas - reducers }  {                  les actions                }                                 **/
export default connect(mapStateToProps, {createTopic, typing, addStarCourse, destroyTopic})(Dashboard);
