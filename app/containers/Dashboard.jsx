import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BackAddUser from '../components/BackAddUser';
import BackListUsers from '../components/BackListUsers';
import { createTopic, typing, ratingUser, destroyTopic, fetchTopics } from '../actions/topics';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

class Dashboard extends Component {

    // {newTopic, ... } = this.props;   => valeur retourné des fonctions des reducers ET des actions
    render() {
        const {newTopic, topics, typing, createTopic, destroyTopic, ratingUser } = this.props;
        return (
            <div className={cx('vote')}>

                <BackAddUser
                    topic={newTopic}
                    onEntryChange={typing}
                    onEntrySave={createTopic}
                />

                <BackListUsers
                    topics={topics}
                    onRatingUser={ratingUser}
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
    ratingUser: PropTypes.func.isRequired,
    newTopic: PropTypes.string
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        topics: state.topic.topics, /** 'state.topic.topics'  défini ici les key + valeurs de notre state + cette partis du state sera utilisé dans les 'reducers' **/
        newTopic: state.topic.newTopic
    };
}


/**           { les datas - reducers }  {   les actions     -   actions     }                                   **/
export default connect(mapStateToProps, {createTopic, typing, ratingUser, destroyTopic})(Dashboard);
