var express = require('express');
var router = express.Router();

const BookController = require('../Controllers/BookConteroller');

router.get('/', BookController.index);

router.get('/add', BookController.add_new_book_form);

router.post('/add', BookController.add_new_book);


router.get('/edit/:id', BookController.edit_book_form);

router.post('/edit/:id', BookController.update_book_data);

router.get('/delete/:id', BookController.delete_the_book);

module.exports = router;
