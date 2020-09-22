var express = require('express');
var router = express.Router();

const { db } = require('../database/config');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function (req, res, next) {

  var sql_string = 'SELECT * FROM Books';

  db.all(sql_string,[], (err, rows) => {
    if(err)
      console.log(err.message);
    else
      res.render('books/list-books', {
        title: 'List of books',
        model: rows
      });
  });
});

router.get('/books/add', function (req, res, next) {
  res.render('books/add-book', {
    title: 'Add a new book'
  });
});

router.post('/books/add', function (req, res, next) {
  console.log(req.body.Title);
  console.log("Add a new book request");
  const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ? , ?)";
  const book = [req.body.Title, req.body.Author, req.body.Comments];
  db.run(sql, book, err => {
     if (err) {
       return console.error(err.message);
     }
     res.redirect("/books");
  });
});


router.get('/contact-us', function (req, res, next) {
  res.render('contact-us', {
    title: 'Contact Us'
  });
});

module.exports = router;
