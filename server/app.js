const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const {check, body, validationResult} = require('express-validator');
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')))
// basic route to create a user
app.use(express.json());



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/user', [
  //outputting invalid value
    check('username', 'Enter your username' )
        .not().isEmpty().withMessage('Username cannot be empty')
        .isLength({ min: 5 }).withMessage('username must be at least 5 characters'),
      //username must be an email
      //outputting invalid value
    check('email', 'enter a valid email address')
        .isEmail(),
        
    //password must be as least 8 character long
    check('password', 'password must be at least 8 characters long and contain a number')
        .not().isIn(['123', 'password', 'god',]).withMessage('Do not use a common word as password')
        .isLength({ min: 8 })
        .matches(/\d/).withMessage('password must contain a number'),
        
    //check that it matches
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation is incorrect')
        }
    })
    
], (req, res, next) => {
        console.log(req.body)
        //find the validation error in this request and wrap them in an object
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }
        // res.status(200).json({
        //     success: "request successful"
        // })
        const {username,email,password, passwordConfirmation } = req.body
        app.create({
            username,
            email,
            password,
            passwordConfirmation
        })
            .then(user => res.json(user)) 
            .catch(next)
}
)

const PORT = 7000
app.listen(PORT, () => {
    console.log(`port running on localhost: ${PORT}`)
})

