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


router.get('/book/edit/:id', function (req, res, next) {

  let id = req.params.id;


  var sql_string = 'SELECT * FROM Books WHERE Book_ID=?';

  db.get(sql_string, id , (err, row) => {
    if (err)
      console.log(err.message);
    else{
      res.render('books/edit-book', {
        title: 'Edit the book',
        book: row
      });
    }
  });

});

router.post('/books/edit/:id', function (req, res, next) {

  let id = req.params.id;

  console.log(req.body);
  console.log(`Edit book with id ${id} request`);

  const sql = "UPDATE Books SET Title=? , Author = ? , Comments = ? WHERE Book_ID = ? ";
  const book = [req.body.Title, req.body.Author, req.body.Comments, id];

  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect(`/books`);
  });

});

router.get('/book/delete/:id', function (req, res, next) {

  let id = req.params.id;

  let compfirmed = confirm("Are you sure?");

  const sql = "DELETE FROM Books WHERE Book_ID=?";

  if(compfirmed === true){
    db.run(sql, id, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect(`/books`);
    });

  }else
    return;

});




router.get('/contact-us', function (req, res, next) {
  res.render('contact-us', {
    title: 'Contact Us'
  });
});

module.exports = router;
