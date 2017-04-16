// Parent : BackListUsers
import React, { PropTypes } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import classNames from 'classnames/bind';
import styles from '../css/components/topic-item';

const cx = classNames.bind(styles);

const BackUser = ({ text, id, count, ratingUser, destroyTopic, isAlreadyRated }) => {

    const onStarClick = (nextValue, prevValue, name) => {
        console.log(id, nextValue, isAlreadyRated);
        // ratingUser(id, valeurFromAttrValueFromProps);
        ratingUser(id, nextValue, isAlreadyRated); // fonction défini dans les actions
    };

    const onDestroy = () => {
        destroyTopic(id);
    };

    return (
        <tr className={cx('topic-item')} key={id}>
            <td><span className={cx('topic')}>{text}</span></td>

            <td><StarRatingComponent name={'starRating_'+id} starCount={5} value={3} onStarClick={onStarClick}/></td>

            <td><button className={cx('button', 'destroy')} onClick={onDestroy}>{String.fromCharCode(215)}</button></td>
            <td><span className={cx('count')}>{count}</span></td>
        </tr>

    );
};

BackUser.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    ratingUser: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired
};

export default BackUser;
