const mongoose = require('mongoose');
const Schema = mongoose.Schema

const questions = new Schema({
    directions:{
        type:Boolean
    },
    question:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    },
    marks:{
        type:Number,
        default:0
    },
    correctanswer:{
        type:String,
        required:true
    }
})
const Question = mongoose.model('Question', questions);

module.exports = Question;


