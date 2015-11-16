// call the packages we need
var express = require('express'); // call express
var mongoose = require('mongoose');
// configure app to use bodyParser()
var bodyParser = require('body-parser');
/*mongoose.connect('mongodb://localhost/learnyoumongo', function() {
    console.log('connected !');
});
*/

/*mongoose.connect('mongodb://heroku_rqjr282q:sigma@123@ds055594.mongolab.com:55594/heroku_rqjr282q', function(err) {
    console.log('connected !' + err);
});*/

var router = require('./api/routes/posts.js');

var app = express(); // define our app using express
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var port = process.env.PORT || 8000; // set our port



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.listen(port);
console.log('server is listening at port 8000');
