import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from '../components/EntryBox';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import { createTopic, typing, incrementCount, decrementCount, destroyTopic, fetchTopics } from '../actions/topics';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

class Vote extends Component {

    // {newTopic, ... } = this.props;   => valeur retourné des fonctions des reducers ET des actions
    render() {
        const {newTopic, topics, typing, createTopic, destroyTopic, incrementCount, decrementCount } = this.props;
        return (
            <div className={cx('vote')}>
                <EntryBox topic={newTopic}
                          onEntryChange={typing}
                          onEntrySave={createTopic}
                />

                <MainSection topics={topics}
                             onIncrement={incrementCount}
                             onDecrement={decrementCount}
                             onDestroy={destroyTopic}
                />

                {/*<p>{ newTopic }</p>*/}

                <Scoreboard topics={topics} />
            </div>
        );
    }
}

Vote.propTypes = {
    topics: PropTypes.array.isRequired,
    typing: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, {createTopic, typing, incrementCount, decrementCount, destroyTopic})(Vote);
