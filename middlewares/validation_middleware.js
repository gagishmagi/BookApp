const Joi = require('joi');
const middleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body,{ abortEarly: false })
        const valid = error == null;

        if(valid){
            next();
        }else{
            const { details } = error
            const message = details.map( item => item.message ).join(',')

            // res.status(422).json({ error: message})
            res.render('books/add-book', {
                title: 'add-book',
                error: message
            });
        }

    }
}

module.exports = middleware;
