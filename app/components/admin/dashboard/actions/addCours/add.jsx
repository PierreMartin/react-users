import React, { PropTypes } from 'react';
import InputAddCours from './input';
import classNames from 'classnames/bind';
import styles from './css/entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to Input
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move Input up to BackAddUser so it's less confusing
const BackAddUser = ({typing, createCours, newCoursValue}) => {
    return (
        <div className={cx('entrybox')}>
            <h1 className={cx('header')}>Ajoute un utilisateur :</h1>

            <InputAddCours
                className={cx('input')}
                value={newCoursValue}
                placeholder="Ajoute un cours"
                typing={typing}
                createCours={createCours}
            />

        </div>
    );
};

BackAddUser.propTypes = {
    newCoursValue: PropTypes.string,
    typing: PropTypes.func.isRequired,
    createCours: PropTypes.func.isRequired
};

export default BackAddUser;
