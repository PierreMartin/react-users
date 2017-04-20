import React, { PropTypes } from 'react';
import Cours from './cours';
import classNames from 'classnames/bind';
import styles from '../../../../css/common/main-section';

const cx = classNames.bind(styles);

const CoursList = ({ courses, addStar, destroyCours }) => {
    const coursesNode = courses.map((cours, key) => {
        return (
            <Cours
                index={key}
                id={cours.id}
                key={key}
                text={cours.text}
                count={cours.count}
                addStar={addStar}
                isVoted={cours.isVoted}
                destroyCours={destroyCours}
            />
        );
    });

    return (
        <div className={cx('main-section')}>
            <h3 className={cx('header')}>List of all the courses</h3>

            <table className={cx('table')}>
                <tbody>
                    <tr className={cx('topic-item')}>
                        <th>Titre</th>
                        <th>Donner une etoile</th>
                        <th>Supprimer</th>
                        <th>Nmbr de points</th>
                    </tr>

                    {coursesNode}

                </tbody>
            </table>

        </div>
    );
};

CoursList.propTypes = {
    courses: PropTypes.array.isRequired,
    addStar: PropTypes.func.isRequired,
    destroyCours: PropTypes.func.isRequired
};

export default CoursList;
