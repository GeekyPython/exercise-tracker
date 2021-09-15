const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    description: {type: String,required: true},
    duration: {type: Number,required: true},
    date: {type: String, default: new Date().toDateString()}
})

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    exercises: [{type: ExerciseSchema}]
});

module.exports = mongoose.model('users',UserSchema);