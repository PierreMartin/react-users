import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './css/cours-item';

const cx = classNames.bind(styles);

const Cours = ({ text, id, count, addStar, destroyTopic, isVoted }) => {
    const disable   = {color: 'gray'};
    const enable    = {color: 'red'};

    const onStarClick = () => {
        if (isVoted) {
            addStar(id, -1, !isVoted); // id, score, isVoted
        } else {
            addStar(id, 1, !isVoted); // id, score, isVoted
        }
    };

    const onDestroy = () => {
        destroyTopic(id);
    };

    return (
        <tr className={cx('topic-item')} key={id}>
            <td><span className={cx('topic')}>{text}</span></td>
            {isVoted ? (<td><i style={enable} onClick={onStarClick}>★</i></td>) : (<td><i style={disable} onClick={onStarClick}>★</i></td>)}
            <td><button className={cx('button', 'destroy')} onClick={onDestroy}>{String.fromCharCode(215)}</button></td>
            <td><span className={cx('count')}>{count}</span></td>
        </tr>
    );
};

Cours.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    addStar: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired
};

export default Cours;
