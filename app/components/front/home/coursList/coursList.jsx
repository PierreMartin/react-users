import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Cours from './cours';
import styles from '../../../../css/common/main-section';

const cx = classNames.bind(styles);


const CoursList = ({ courses }) => {
    const coursesNode = courses.map((cours, key) => {
        return (
            <Cours
                index={key}
                id={cours._id}
                key={key}
                text={cours.text}
                count={cours.count}
            />
        );
    });

    return (
        <div className={cx('main-section')}>
            <h3 className={cx('header')}>Liste des utilisateurs :</h3>

                <ul className={cx('list-users-container')}>
                    {coursesNode}
                </ul>

        </div>
    );
};


CoursList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CoursList;