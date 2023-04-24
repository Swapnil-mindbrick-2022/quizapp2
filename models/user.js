const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
    Name:{
        type:String,
        required: true,
    },
    College:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    Mobileno:{
        type:Number,
        required:true

    },
    Rollno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date :{ type : Date, default: Date.now }
})
results = mongoose.model('user',userSchema);
module.exports = results;





