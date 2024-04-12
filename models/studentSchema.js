const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = Schema({
    studentName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    studentId:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Student", Student)