const express = require('express');
const app = express();
const mongoose = require('mongoose')
const multer = require('multer')
const csv = require('csvtojson')
const Student = require("./models/studentSchema")

mongoose.connect('mongodb://127.0.0.1:27017/students')
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});


const upload = multer({
    storage, 
})


app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const jsonArray = await csv().fromFile(req.file.path);
        const result = await Student.insertMany(jsonArray);
        res.json({ message: "Added successfully", data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log(`Server listening on 3000`)
})