import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/topic-item';

const cx = classNames.bind(styles);

const BackUser = ({ text, id, count, incrementCount, decrementCount, destroyTopic }) => {
    const onIncrement = () => {
        incrementCount(id);
    };

    const onDecrement = () => {
        decrementCount(id);
    };

    const onDestroy = () => {
        destroyTopic(id);
    };

    return (
        <tr className={cx('topic-item')} key={id}>
            <td><span className={cx('topic')}>{text}</span></td>
            <td><button className={cx('button', 'increment')} onClick={onIncrement}>+</button></td>
            <td><button className={cx('button', 'decrement')} onClick={onDecrement}>-</button></td>
            <td><button className={cx('button', 'destroy')} onClick={onDestroy}>{String.fromCharCode(215)}</button></td>
            <td><span className={cx('count')}>{count}</span></td>
        </tr>

    );
};

BackUser.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired
};

export default BackUser;
