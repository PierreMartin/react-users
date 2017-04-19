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
const BackAddUser = ({onEntryChange, onEntrySave, topic}) => {
    return (
        <div className={cx('entrybox')}>
            <h1 className={cx('header')}>Ajoute un utilisateur :</h1>

            <InputAddCours
                className={cx('input')}
                value={topic}
                placeholder="Ajoute un cours"
                onEntryChange={onEntryChange}
                onEntrySave={onEntrySave}
            />

        </div>
    );
};

BackAddUser.propTypes = {
    topic: PropTypes.string,
    onEntryChange: PropTypes.func.isRequired,
    onEntrySave: PropTypes.func.isRequired
};

export default BackAddUser;
