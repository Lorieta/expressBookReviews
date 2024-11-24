const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
 

  if(!username || !password){
    res.status(400).send("Username and password required");
  }

  const user = users.find(user => user.username === username);
if(user){
  res.status(400).send("User already registered");
}

  users.push({"username": username, "password": password});
  res.send("User registered " + username );

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  res.send(JSON.stringify(books));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;
  if(books[isbn]){
    res.send(JSON.stringify(books[isbn]));}

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const author = req.params.author;
  let author_books = {};
  for(let i in books){
    if(books[i].author === author){
      author_books[i] = books[i];
    }
  }
  res.send(JSON.stringify(author_books)); 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  let title_books = {};
  for(let i in books){
    if(books[i].title === title){
      title_books[i] = books[i];
    }
  }
  res.send(JSON.stringify(title_books));

  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; 
  if(books[isbn]){
    const reviews = books[isbn].reviews;

    res.send(JSON.stringify(reviews));
  }else{
    res.status(404).send("Book not found");
  }

});

module.exports.general = public_users;
