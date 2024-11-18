const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;

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

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
