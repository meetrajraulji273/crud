const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    address:{
        type: String,
        maxlength:200,
    },
    subjects:{
        type: [String],
        required:true
    },
    subject:{
        type:String,
        required:true
    }
})

const Info = mongoose.model("Info",infoSchema);

module.exports = Info;