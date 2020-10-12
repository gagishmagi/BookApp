var express = require('express');
var router = express.Router();

const BookController = require('../Controllers/BookConteroller');
const validation = require('../middlewares/validation_middleware');
const Schemas = require('../Models/schemas/schemas');


router.get('/' , BookController.index);

router.get('/add', BookController.add_new_book_form);

router.post('/add', validation(Schemas.Book) , BookController.add_new_book);


router.get('/edit/:id', BookController.edit_book_form);

router.post('/edit/:id', validation(Schemas.Book), BookController.update_book_data);

router.get('/delete/:id', BookController.delete_the_book);

module.exports = router;
