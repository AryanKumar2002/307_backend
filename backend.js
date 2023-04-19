const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;

    if (name && job) {
        result = findUserByNameAndJob(name, job);
    } else if (name) {
        result = findUserByName(name);
    } else {
        result = users['users_list'];
    }

    res.send({ users_list: result });
});

function findUserByNameAndJob(name, job) {
    return users['users_list'].filter(user => user.name === name && user.job === job);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd); 
});

function generateRandomId() {
    return Math.random().toString(36).substr(2, 6);
}

function addUser(user){
    user.id = generateRandomId();
    users['users_list'].push(user);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const userToRemove = findUserById(id);
    if (userToRemove === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        removeUserById(id);
        res.status(204).end();
    }
});

function removeUserById(id) {
    users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      