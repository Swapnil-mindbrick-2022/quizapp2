const mongoose = require('mongoose');
const Schema = mongoose.Schema;

resultSchema = new Schema( {
    Name:{
        type:String,
        required:true
    },
    hallTicketNumber:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    marksObtained:{
        type:Number,
        default:0
    },
    testStatus:{
        type:String,
        default:'pending'
    },
    startTime:Date,
    time:Number,
    questionsAttempted:{
        type:Number,
        default:0
    },

    date :{ type : Date, default: Date.now }
})
results = mongoose.model('result',resultSchema);

module.exports = results;