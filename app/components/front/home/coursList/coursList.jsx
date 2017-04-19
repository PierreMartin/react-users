import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Cours from './cours';
import styles from '../../../../css/components/main-section';

const cx = classNames.bind(styles);


const CoursList = ({ topics }) => {
    const users = topics.map((topic, key) => {
        return (
            <Cours
                index={key}
                id={topic._id}
                key={key}
                text={topic.text}
                count={topic.count}
            />
        );
    });

    return (
        <div className={cx('main-section')}>
            <h3 className={cx('header')}>Liste des utilisateurs :</h3>

                <ul className={cx('list-users-container')}>
                    {users}
                </ul>

        </div>
    );
};


CoursList.propTypes = {
    topics: PropTypes.array.isRequired
};

export default CoursList;