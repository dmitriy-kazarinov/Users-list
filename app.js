var express = require('express');
var app = express();
var helpers = require('express-helpers')(app);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

mongoose.connect('private info');
//create schema
var usersListSchema = new mongoose.Schema({
    name: String,
    type: String,
    age: Number
});

var UserList = mongoose.model('Users-list', usersListSchema);

//var firstUser = UserList({
//    name: 'Kandice Saldivar',
//    type: 'Female',
//    age: 20
//}).save(function(err){
//    if(err)
//        throw err;
//    console.log('User saved');
//});

app.set('view engine', 'ejs');
//app.use('/assets', function(req, res, next){
//    next();
//});
app.use('/assets', express.static('assets'));
app.use('/node_modules', express.static('node_modules'));

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.route('/users')
    .get(function(req, res){
        //res.sendFile(__dirname + '/views/users-list.html');
        //get data from mongodb
        UserList.find({}, function(err, data){
            if(err)
                throw err;
            res.render('users-list', {users: data});
        });
    })
    .post(urlencodedParser, function(req, res){
        if (!req.body) return res.sendStatus(400);
        var newUser = UserList(req.body).save(function(err, data){
            if(err)
                throw err;
            console.log('User saved');
            res.json(data);
        });
    });

app.delete('/users/:name', function(req, res){
   console.log(req.params.name);
    UserList.find({ "name": req.params.name }).remove(function(err, data){
        if(err)
            throw err;
        console.log('User deleted');
        res.json(data);
    });
});

app.get('/user/:id', function(req, res){
    UserList.find({}, function(err, data){
        if(err)
            throw err;

        var filterUsers = data.filter(function(user) {
            return user._id == req.params.id;
        })[0];

        console.log(filterUsers);
        res.render('user-profile', {user: filterUsers});
    });
});

app.use(function(req, res, next){
    res.status(404).render('404-error', {title: "Sorry, page not found"});
});
app.use(function(error, req, res, next) {
    res.status(500).render('500-error', {title:'500: Internal Server Error', error: error});
});

app.listen('3000', function(){
    console.log('Server is running...');
});