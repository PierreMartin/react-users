wonderful development experience !

#### PACKAGES ####
- react-transform-hmr (Deprecated)          résout certains problèmes de avec React Hot Loader et React Transform
- CSS Module                                fichier css qui evite les conflit, pas de scope global, css réutilisable
- test unitaires :                          webpack, karma, jsdom, mocha, sinon & enzyme

- PostCSS                                   post-processeur css avec javascript
    - autoprefixer                          permet de nettoyer le CSS en enlevant les préfixes (-moz-, -webkit-, -ms-)
    - CSS Modules                           permet d'associer une classe à un fichier css particulié (évite les conflits)
    - cssnext                               permet d'utiliser les nouvelles propriétés css MEME si pas supporté pas les browsers
- classnames                                assemblage des classes ensembles (permet en js d'ajouter ou non des classes via des boolean)




#### DATABASE ####
- Mongoose for MongoDB
- Sequelize for Postgres


#### REDUX ####
- Un seul store
- Le state peut seulement etre lue (immutable)
- Mutation ecrit en fonctions pure


################################ FRONT END ################################
=> COMPOSANTS (envoie les données au "reducer" + definie les actions depuis les "actions" ) 
    => ACTIONS dispatche des objets au + fait les requetes serveur
        => REDUCERS met à jour le store 
            => COMPOSANTS

################################ BACK END ################################
server/index.js
        => route 
            => db/index 
                =>  db/mongo/index
                    => connect
                    => controllers
                        => db/mongo/controller/index
                    => passport
                    => session

        

################################ START ################################
### development :
$ sudo mongod
$ npm run dev




################################ TREE COMPONENTS ################################
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





