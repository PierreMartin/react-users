import React, { Component, PropTypes } from 'react';
import StarRating from 'react-star-rating';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BackAddUser from '../components/BackAddUser';
import BackListUsers from '../components/BackListUsers';
import { createTopic, typing, incrementCount, decrementCount, destroyTopic, fetchTopics } from '../actions/topics';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

class Dashboard extends Component {

    handleRatingClick(e, data) {
        console.log('ok');
    }

    // {newTopic, ... } = this.props;   => valeur retourné des fonctions des reducers ET des actions
    render() {
        const {newTopic, topics, typing, createTopic, destroyTopic, incrementCount, decrementCount } = this.props;
        return (
            <div className={cx('vote')}>

                /*<ul>
                    <li>penser à créer des fichiers css 'back' et 'front'</li>
                    <li>Remplacer +1 / -1 par des note de 1 à 5 (étoiles)</li>
                    <li>Webpack : generer des fichiers css au lieu d'injecter le css dans le js</li>
                    <br/>
                    <li>enlever la possibilité d'ajouter une personne - ajouter possibilité d'editer son profil</li>
                    <li>Ajouter des attribus dans le modele Mongo (Age, sexe, ville...) - désactiver la collection 'topics'</li>
                    <li>Prevoir un filtre d'affichage des personnes (par age, par ville)</li>
                </ul>*/

                <BackAddUser
                    topic={newTopic}
                    onEntryChange={typing}
                    onEntrySave={createTopic}
                />

                <BackListUsers
                    topics={topics}
                    onIncrement={incrementCount}
                    onDecrement={decrementCount}
                    onDestroy={destroyTopic}
                />

                <StarRating name="react-star-rating" size={20} totalStars={5} onRatingClick={this.handleRatingClick.bind(this)} />

            </div>
        );
    }
}

Dashboard.propTypes = {
    topics: PropTypes.array.isRequired,
    typing: PropTypes.func.isRequired,
    createTopic: PropTypes.func.isRequired,
    destroyTopic: PropTypes.func.isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    newTopic: PropTypes.string
};


/** contient les data **/
function mapStateToProps(state) {
    return {
        topics: state.topic.topics, /** 'state.topic.topics'  défini ici les key + valeurs de notre state + cette partis du state sera utilisé dans les 'reducers' **/
        newTopic: state.topic.newTopic
    };
}


/**           { les datas - reducers }  {   les actions     -   actions     }                                   **/
export default connect(mapStateToProps, {createTopic, typing, incrementCount, decrementCount, destroyTopic})(Dashboard);
