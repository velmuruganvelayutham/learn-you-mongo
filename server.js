// call the packages we need
var express = require('express'); // call express
var mongoose = require('mongoose');
// configure app to use bodyParser()
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/learnyoumongo', function() {
    console.log('connected !');
});
mongoose.set('debug', true)
var Post = require('./api/model/posts.js');
var app = express(); // define our app using express
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var port = process.env.PORT || 8000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// logging middeware for all the routes
router.use(function(req, res, next) {
    console.log('something happening');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api  by Vel/Mur!'
    });
});

router.route('/posts')

.post(function(req, res) {
    var blog_post = new Post();
    blog_post.name = req.body.name;
    blog_post.content = req.body.content;
    blog_post.description = req.body.description;
    console.log('name is ' + blog_post);
    blog_post.save(function(err, post) {
        if (err)
            return handleError(res, err);
        res.json(post);

    });
})

.get(function(reg, res) {
    Post.find(function(err, posts) {

        if (err)
            return handleError(res, err);
        if (!posts)
            res.status(404).send("Post Not Found !.");
        res.json(posts);
    });
});

router.route('/posts/:post_id')
    .get(function(req, res) {

        Post.findById(req.params.post_id, function(err, post) {
            if (err)
                return handleError(res, err);
            if (!post)
                res.status(404).send("Post Not Found !.");
            res.json(post);

        })
    })
    .put(function(req, res) {

        Post.findById(req.params.post_id, function(err, post) {
            if (err)
                return handleError(res, err);
            if (!post)
                res.status(404).send("Post Not Found !.");
            post.name = req.body.name;
            post.content = req.body.content;
            post.description = req.body.description;
            post.save(function(err, post) {
                if (err)
                    return handleError(res, err);
                res.json(post);
            });

        })

    })
    .delete(function(req, res) {

        Post.remove(req.params.post_id, function(err, post) {
            if (err)
                res.status(404).send("Post Not Found !.");
            res.json(post);
        })

    });

function handleError(res, err) {
    return res.status(500).send(err);
}
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.listen(port);
console.log('server is listening at port 8000');
