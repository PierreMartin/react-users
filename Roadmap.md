##################################################### PACKAGES #####################################################
- react-transform-hmr (Deprecated)          résout certains problèmes de avec React Hot Loader et React Transform
- test unitaires :                          webpack, karma, jsdom, mocha, sinon & enzyme

- PostCSS                                   post-processeur css avec javascript
    - autoprefixer                          permet de nettoyer le CSS en enlevant les préfixes (-moz-, -webkit-, -ms-)
    - CSS Modules                           permet d'eviter les conflit, pas de scope global, css réutilisable -- associe une classe à un fichier css particulié
    - cssnext                               permet d'utiliser les nouvelles propriétés css MEME si pas supporté pas les browsers
- classnames                                assemblage des classes ensembles (permet en js d'ajouter ou non des classes via des boolean)




##################################################### REDUX RECAP #####################################################
=> COMPOSANTS (envoie les données au "reducer" + envoie les actions aux "actions" ) 
    => ACTIONS dispatch des objets + fait les requetes serveur
        => REDUCER met à jour le store 
            => COMPOSANTS


############ 1) LES COMPOSANTS
- c'est la Vue
- envoie les données au "reducer" + envoie les actions aux "actions"


############ 2) LES ACTIONS
- 1 Action => un objet (décrivant ce qui a changé dans l'application)
- dispatch des objets + fait eventuellement des requetes serveur


function voted(id, scoreValue) {
    return {
        type: 'RATING_COURS_SUCCESS',
        id: id,
        scoreValue: scoreValue
    };
}


############ 3) LE REDUCER
- C'est une fonction qui calcule le prochain state basé sur le précédent
- Cette fonction dois être pur, de sorte qu'il doit retourner un NOUVEL objet

- Le Reducer possede le "state" et l'"action" comme params et renvoie le state suivant
`1 reducer peut être appelé par 1 autre reducer`


const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}


############ 4) LE STORE
# store.getState()       => le state actuelle du store
const store = createStore(counter);
console.log(store.getState());


# store.dispatch()       => Set le state en fonction de l'action
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());


# store.subscribe() :    => rend (affiche) le state dispatché
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});



############ X) LE STATE
- state => données de l'app dans un big json
- Un state ne peut pas être changer - il faudra dans ce cas envoyer une "action"


############ X) React context (provider)
Le composant "Provider" utilisera la fonction de React "context" pour rendre le store à la disposition de tout composant à l'intérieur, y compris les petits-enfants




########################################################## START ##########################################################
### development :
$ sudo mongod
$ npm run dev

### Mongo 
- db: 'ReactGo'
- collections: 'sessions', 'users', 'cours'


$ mongo 
$> show dbs
$> use ReactGo
$> show collections

db.cours.find()
db.cours.find({"text": "test 1"} , {_id:0}) 

db.cours.remove({})
db.cours.insert({text: "test 1", count: 0})

db.users.update({email: "pierre@gmail.com"} , {$set : {profile: {name: "Pierre Martin", gender: "male", picture: "http://localhost:3000/xxx"}} })  

user => créer un compte sur l'app (pierre@gmail.com 1234)
db.users.find()

mongod --shutdown



/!!\ dans Mongoose on a   model('Cours', CoursSchema)   => mongodb rajoute un 's' dans les collections + met tout en minuscule (sauf si déja un 's' a la fin, ce qui est le cas)



##################################################### TREE COMPONENTS #####################################################
- client    store={store}    NE PAS TOUCHER 
    - routes '/'
        - App
            - Navigation
            - Message   ?? 
            - Vote
                - EntryBox
                    - TopicTextInput
                        <input />
                - MainSection           (a gauche - Vote for your favorite hack day idea)
                    - TopicItem         (1 topic)
                    - TopicItem         (1 topic)
                    - TopicItem         (1 topic)
                    - TopicItem         (1 topic)
                    ...
                - Scoreboard            (a droite - Vote count)
                    topic.text
                    topic.text
                    topic.text
                    
    - routes '/about'



################################ ROUTES ################################
Route	           POST	                        GET	                           PUT	                                  DELETE
/api/user	        -	                    Get all users                   	-                                       -
/api/user/:id	    -	                    Get a user	                Update a user	                                -


GET usersList   => GET userSingle(usersList[0]._id)     -> user
GET auth        => GET usersMe(auth._id)                -> userMe



##################################################### TODO #####################################################
`- voir passport js`
`- changer tout les 'courses' par 'cours'`

- gerer le cas ou y'a une erreur à la saisie du form du login
- gerer les dates
- implémenter l'avatar dans l'update
- page 'mon profil' -> ajouter des champs (prenom, age, ville, ...)

- cours => page single - et renomer dans reducer :
    - state.cours.single
    - state.cours.all
    - state.cours.byUser
    
- users => renomer dans reducer :
    - state.users.single
    - state.users.all
    - state.users.byFriend    
    
- finir CRUD des users + cours (GET: DONE, POST, PUT, DELET)
- Prevoir un filtre d'affichage des personnes (par age, par ville)

- gerer tous les messages (succes et d'erreurs) de facon generique - reducer 'popupMessage'
- implementer Webpack2

+ Commiter avec des emojis
