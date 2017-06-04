'use strict'

//get dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Schemas
var Habit = new Schema({
    id: Number,
    title: String,
    picture: String,
    info: String,
    notes: Number,
    streak: Number,
    isActive: Boolean,
    isLoved: Boolean
});

var userModelSchema = new Schema({
    //Personal Info
    firstName: String,
    middleInitial: String,
    lastName: String,
    email: String,
    picture: String,

    //Habits
    habits: [Habit]
},
{ collection: 'users' });

module.exports = mongoose.model('User', userModelSchema);
