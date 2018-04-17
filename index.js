/*@desc(import the core and 3rdp modules)*/

const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const request = require('request');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash= require('express-flash');
/*@desc(Init app)*/
const app = express();


// mongodb://<dbuser>:<dbpassword>@ds247569.mlab.com:47569/navneetnewsletter
/*@desc(Add the required modules)*/
app.engine('.hbs',exphbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :  false}));
app.use(morgan('dev'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret : "Navneet",
    store: new MongoStore({ url: 'mongodb://navneet:1234@ds247569.mlab.com:47569/navneetnewsletter'})
}));
app.use(flash());

//e41034809630e5fab3409a46ab22d277-us18
//https://us18.api.mailchimp.com/3.0/ list/91e676a323/members 

app.route('/')
.get((req,res,next)=>
{
    res.render('main/home', {message : req.flash('success')});
})
.post((req,res,next)=>{ 
    request({
        url:'https://us18.api.mailchimp.com/3.0/lists/91e676a323/members',
        method: 'POST',
        headers:{
            'Authorization': 'randomUser e41034809630e5fab3409a46ab22d277-us18',
        
            'Content-Type' : 'aplication/json'
        },

        json:
        {
            'email_address': req.body.email ,
            'status' : 'subscribed'
        }

    },function(err,response,body)
{
    if(err)
    {
        console.log(err);
    }
    else{
      req.flash('success','You Have Submitted your email ')
     res.redirect('/');    
    }
});
});
const port = process.env.PORT || Math.floor(Math.random()*10000) + 1;
app.listen(port,() => console.log(`Server running on port: ${port}`));

