import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/topic-item';
import avatar from '../images/apple-ninja152-precomposed.png';

const cx = classNames.bind(styles);

const FrontUser = ({ text, id, count }) => {
    return (
        <li className={cx('user-container')} key={id}>
            <a href="#" className={cx('user-links')}>
                <figure>
                    <img src={avatar} alt="" className={cx('img-item')}/>
                        <figcaption>
                            <span className={cx('topic')}>{text}</span>
                            <br/>
                            <span className={cx('count')}>{count}</span>
                        </figcaption>
                </figure>
            </a>
        </li>
    );
};

FrontUser.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default FrontUser;
