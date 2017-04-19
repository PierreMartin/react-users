import React, { PropTypes } from 'react';
import Cours from './cours';
import classNames from 'classnames/bind';
import styles from '../../../../css/components/main-section';

const cx = classNames.bind(styles);

const CoursList = ({ topics, addStar, onDestroy }) => {
    const users = topics.map((topic, key) => {
        return (
            <Cours
                index={key}
                id={topic.id}
                key={key}
                text={topic.text}
                count={topic.count}
                addStar={addStar}
                isAlreadyRated={topic.isAlreadyRated}
                isVoted={topic.isVoted}
                destroyTopic={onDestroy}
            />
        );
    });

    return (
        <div className={cx('main-section')}>
            <h3 className={cx('header')}>Vote for your favorite hack day idea</h3>

            <table className={cx('table')}>
                <tbody>
                    <tr className={cx('topic-item')}>
                        <th>Titre</th>
                        <th>Donner une note</th>
                        <th>Supprimer</th>
                        <th>Nmbr de points</th>
                    </tr>

                    {users}

                </tbody>
            </table>

        </div>
    );
};

CoursList.propTypes = {
    topics: PropTypes.array.isRequired,
    addStar: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired
};

export default CoursList;
