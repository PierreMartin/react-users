import React, { PropTypes } from 'react';
import InputAddCours from './input';
import classNames from 'classnames/bind';
import styles from './css/entrybox';

const cx = classNames.bind(styles);


const BackAddUser = ({typingCreateCourAction, createCours, typingCreateCourState}) => {
    return (
        <div className={cx('entrybox')}>
            <h1 className={cx('header')}>Ajoute un utilisateur :</h1>

            <InputAddCours
                className={cx('input')}
                value={typingCreateCourState}
                placeholder="Ajoute un cours"
								typingCreateCourAction={typingCreateCourAction}
                createCours={createCours}
            />

        </div>
    );
};

BackAddUser.propTypes = {
		typingCreateCourState: PropTypes.string,
		typingCreateCourAction: PropTypes.func.isRequired,
    createCours: PropTypes.func.isRequired
};

export default BackAddUser;
