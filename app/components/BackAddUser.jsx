import React, { PropTypes } from 'react';
import BackAddUserInput from '../components/BackAddUserInput';
import classNames from 'classnames/bind';
import styles from '../css/components/entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to BackAddUserInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move BackAddUserInput up to BackAddUser so it's less confusing
const BackAddUser = ({onEntryChange, onEntrySave, topic}) => {
    return (
        <div className={cx('entrybox')}>
            <h1 className={cx('header')}>Ajoute un utilisateur :</h1>

            <BackAddUserInput
                className={cx('input')}
                value={topic}
                placeholder="Ajoute un utilisateur"
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
