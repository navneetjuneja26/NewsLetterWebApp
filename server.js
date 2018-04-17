/*@desc(import the core and 3rdp modules)*/

const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const request = require('request');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

/*@desc(Init app)*/
const app = express();

/*@desc(Add the required modules)*/
app.engine('.hbs',exphbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :  false}));
app.use(morgan('dev'));

/* @endpoint = '/' */ 
/* @desc(GET request to the HOME route)*/
app.get('/',(req, res, next) => res.render('main/home'));

/*@desc(Make the incoming request hit the server at random port)*/
const port = process.env.PORT || Math.floor(Math.random()*10000) + 1;
app.listen(port,() => console.log(`Server running on port: ${port}`));

