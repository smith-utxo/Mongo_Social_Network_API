const express = require('express');
const mongoose = require('mongoose');

const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

app.use(require('./routes')); 

// This will define the name of the MongoDB database. If the environment variable already exists, like on Heroku, it will use that, otherwise it will short-circuit to the local MongoDB server's Database at mongodb://127.0.0.1:27017/social-app
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true); 

app.listen(PORT, () => console.log(`Connected on localhost: ${PORT}`)); 