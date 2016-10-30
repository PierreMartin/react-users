import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import FrontListUsers from '../components/FrontListUsers';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

class Home extends Component {

    render() {
        const { topics } = this.props;

        return (
            <div className={cx('vote')}>
                <h1>Bienvenue</h1>

                <FrontListUsers topics={topics}/>

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
