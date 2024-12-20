const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let validUser = users.filter(user =>
  {return user.username === username});
return user.username === username;

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validUser = users.filter(user =>{return user.username === username && user.password === password});
return validUser.len;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (!username || !password) {
    return res.status(400).json({message: "Invalid username or password"});
  }

  if (authenticatedUser(username, password)) {
    const token = jwt.sign({
      data: password
    }, 'access', {expiresIn: '1h'});

    req.session.authorization = {
      accessToken,username
    };
    return res.status(200).send({message: "Login successful", token: token});
  } else {
    return res.status(403).send({message: "Invalid username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
