import React, { PropTypes } from 'react';
import BackUser from '../components/BackUser';
import classNames from 'classnames/bind';
import styles from '../css/components/main-section';

const cx = classNames.bind(styles);

const BackListUsers = ({ topics, onDecrement, onDestroy }) => {
    const users = topics.map((topic, key) => {
        return (
            <BackUser
                index={key}
                id={topic.id}
                key={key}
                text={topic.text}
                count={topic.count}
                decrementCount={onDecrement}
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

BackListUsers.propTypes = {
    topics: PropTypes.array.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired
};

export default BackListUsers;
