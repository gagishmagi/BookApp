const Book = require('../Models/Book');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');


exports.index = async function (req, res) {

    let rows = [];
    // Old way ES5
    // Book.getAllBooks().then(function (rows) {
    //     res.render('books/list-books', {
    //         title: 'List of books',
    //         model: rows
    //     });
    // }).catch(function (err) {
    //     console.log(err.message)
    // });

    // New way ES6
    try {
        rows = await Book.getAllBooks()
        // console.log(rows);
    } catch (error) {
        console.log(error.message)
    }

    res.render('books/list-books', {
        title: 'List of books',
        model: rows
    });

}


exports.add_new_book_form = function (req, res) {
    res.render('books/add-book', {
        title: 'Add a new book'
    });
}

exports.add_new_book =  function (req, res) {
     let book_title;
     let book_author;
     let book_comments;
     let book_image;


    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) =>{

        const type = file.type.split('/')[1]

        if (type == 'png' || type == 'jpg' || type == 'jpeg' || type == 'gif') {
            file.path  = path.join(__dirname, '..', 'public', 'images', file.name)
        }
        else{
            fs.unlink(file.path)
            console.error('error', "JPG's, PNG's, GIF's only")
            throw err
        }

    })
    .on('file', (name, file) => {
        // console.log('File Uploaded', name, file )

        book_image = file.name;

        // after the break get path to public images folder to save the file
        // const upload_path = path.join(__dirname, '..' ,'public', 'images' )
        // fs.rename(file.path, upload_path , (err) => {
        //     if(err){
        //         console.log('Error', err)
        //     }
        //     console.log(" File is in folder")
        // })
        // fs.rename(file.path)
    })
    .on('field', (name, field) => {
        console.log('Field', name, field)
        console.log(name)
        switch (name) {
            case 'Title':
                book_title = field
                console.log(book_title)
                break;

            case 'Author':
                book_author = field
                break;

            case 'Comments':
                book_comments = field
                break;

            default:
                break;
        }

        // if( name === 'Title')
        //     book_title = field;
        // if (name === 'Author')
        //     book_author = field;
        // if (name === 'Comments')
        //     book_comments = field;
    })
    .on('error', (err) => {
        console.error('Error', err)
        throw err
    })
    .on('end', () => {
        // console.log(book_title);
        // console.log(book_author);
        // console.log(book_comments);
        // console.log(book_image);

        try {
            Book.addBook(book_title, book_author, book_comments, book_image);
        } catch (error) {
            console.log(error.message)
        }

        res.redirect(`/books`);
        res.end()
    })


}


exports.edit_book_form = async function (req, res) {

    let id = req.params.id;

    let row;

    try {
        row = await Book.getBook(id);
    } catch (error) {
        console.log(error)
    }

    res.render('books/edit-book', {
                title: 'Edit the book',
                book: row
            });

    // var sql_string = 'SELECT * FROM Books WHERE Book_ID=?';

    // db.get(sql_string, id, (err, row) => {
    //     if (err)
    //         console.log(err.message);
    //     else {
    //         res.render('books/edit-book', {
    //             title: 'Edit the book',
    //             book: row
    //         });
    //     }
    // });

}

exports.update_book_data = function (req, res) {

    // let id = req.params.id;

    // console.log(req.body);
    // console.log(`Edit book with id ${id} request`);

    // const sql = "UPDATE Books SET Title=? , Author = ? , Comments = ? WHERE Book_ID = ? ";
    // const book = [req.body.Title, req.body.Author, req.body.Comments, id];

    // db.run(sql, book, err => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //     res.redirect(`/books`);
    // });

}

exports.delete_the_book = function (req, res) {

    // let id = req.params.id;

    // // let compfirmed = confirm("Are you sure?");

    // const sql = "DELETE FROM Books WHERE Book_ID=?";

    // // if (compfirmed === true) {
    // db.run(sql, id, err => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //     res.redirect(`/books`);
    // });

    // } else
    // return;

}
