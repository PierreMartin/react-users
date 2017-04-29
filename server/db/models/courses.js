import mongoose from 'mongoose';

const CoursSchema = new mongoose.Schema({
    id: String,
    text: String,
    count: {type: Number, min: 0},
    isVoted: {type: Number, default: 0}, // a supprimer - ca sera l'utilisateur qui aura ce champ
    date: {type: Date, default: Date.now}
});

export default mongoose.model('Cours', CoursSchema);
