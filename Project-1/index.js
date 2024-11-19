const express = require('express');
const users = require('./MOCK_DATA.json');
const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();
const PORT = 8000;
app.use(bodyParser.json());

//GET request
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html =`
        <ul>
            ${users.map((item) => `<li>${item.first_name}</li>`).join("")}
        </ul>
    `
    return res.send(html);
});

app.route('/api/users/:id')
    .get((req, res) => {
        const paramId = req.params.id; 
        const user = users.find((item) => item.id == paramId); 
        return res.json(user);
    })
    .patch((req, res) => { 
        return res.json({status: "pending"});
    })
    .delete((req, res) => {
        return res.json({status: "pending"});
    })

app.post('/api/users', (req, res) => {
    const body = req.body;    
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length});
    })
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
