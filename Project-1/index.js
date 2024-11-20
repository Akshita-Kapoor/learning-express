const express = require('express');
// const users = require('./MOCK_DATA.json');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const PORT = 8000;
app.use(bodyParser.json());

// Connection
mongoose.connect('mongodb://localhost:27017/app1')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Mongo error', err))

// Schema
const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            unique: true
        }
    },
    {timestamps: true}
)

const User = mongoose.model('user', userSchema);

//GET request
app.get('/api/users', async(req, res) => {
    const allUsers = await User.find({});    
    return res.json(allUsers);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.find({});    
    const html =`
        <ul>
            ${allUsers.map((item) => `<li>${item.firstName} - ${item.email}</li>`).join("")}
        </ul>
    `
    return res.send(html);
});

app.route('/api/users/:id')
    .get(async(req, res) => {
        const paramId = req.params.id; 
        const user = await User.findById(paramId);
        if(!user) {
            return res.status(400).json({error: 'user nor found'});
        }
        return res.json(user);
    })
    .patch(async (req, res) => {
        const user = await User.findByIdAndUpdate(req.params.id, {lastName: 'updated name'});
        return res.json({status: "success"});
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: "success"});
    })

app.post('/api/users', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email) {
        return res.status(400).json({msg: 'All fields are required.'});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email:body.email
    })    
    return res.status(201).json({msg: "success"});
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
