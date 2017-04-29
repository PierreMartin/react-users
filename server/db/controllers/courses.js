import _ from 'lodash';
import Cours from '../models/courses';

/**
 * List
 */
export function all(req, res) {
    Cours.find({}).exec((err, courses) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong getting the data');
        }

        return res.json(courses);
    });
}

/**
 * Add a cours
 */
export function add(req, res) {
    Cours.create(req.body, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }

        return res.status(200).send('OK');
    });
}

/**
 * Update a cours
 */
export function update(req, res) {
    const query             = {id: req.params.id};
    const count             = req.body.count;
    const isVoted           = req.body.isVoted;

    //const omitKeys        = ['id', '_id', '_v', 'isIncrement', 'isFull'];
    //const data            = _.omit(req.body, omitKeys);

    /*if (isFull) {
        Cours.findOneAndUpdate(query, data, (err) => {
            if (err) {
                console.log('Error on save!');
                return res.status(500).send('We failed to save for some reason');
            }

            return res.status(200).send('Updated successfully');
        });
    } else {
        Cours.findOneAndUpdate(query, {$inc: {count: isIncrement ? 1 : -1}}, (err) => {
            if (err) {
                console.log('Error on save!');
                return res.status(500).send('We failed to save for some reason');
            }

            return res.status(200).send('Updated successfully');
        });
    }*/

    Cours.findOneAndUpdate(query, {$inc: {count: count}, isVoted: isVoted}, (err) => {
        if (err) {
            console.log('Error on save!');
            return res.status(500).send('We failed to save for some reason');
        }

        return res.status(200).send('Updated successfully');
    });

}

/**
 * Remove a cours
 */
export function remove(req, res) {
    const query = {id: req.params.id};

    Cours.findOneAndRemove(query, (err) => {
        if (err) {
            console.log('Error on delete');
            return res.status(500).send('We failed to delete for some reason');
        }

        return res.status(200).send('Removed Successfully');
    });
}

export default {
    all,
    add,
    update,
    remove
};
