require('@abtnode/mongoose-nedb').install();

const express = require('express');
const router = express.Router();
const sessions = require('express-session');
const User = require('../model/user.js');
const bcrypt = require('bcryptjs');
const os = require('os');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
 
mongoose.set('debug', true);
mongoose.Promise = Promise;
 
const dbPath = path.join(os.tmpdir(), 'nedb');
fs.mkdirSync(dbPath, { recursive: true });
 
const ensureConnection = () => {
  return new Promise((resolve, reject) => {
    // This is needed
    mongoose.connect('mongodb://localhost/test', { dbPath });
    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error.bind(console, 'connection error:');
      reject(err);
    });
    db.once('open', async () => {
      console.log('connected', dbPath);
      resolve(db);
    });
  });
};

//login page
var session;

router.get('/user/login', (req, res) => {
  session = req.session;
  if(session.userid) {
    res.send('Welcome user <a href="logout">click to logout    </a>')
  }
  else
  res.sendFile('view/user/login',{root: Routes});
});

router.post('/user/login', (req, res) => {
  if(req.body.email == 'johnDoe@gmail.com' && req.body.password == 'tokoyama') {
    session = req.session;
    session.userid = req.body.email;
    console.log(req.session);
    res.send('Hey there, Welcome <a href="../view/user/logout">Click to logout</a>');
  }
  else{
  res.send('Invalid email or password');
  }
});

router.post('/user/register', (req, res) => {
	const {name, email, password, password2} = req.body;
	let errors = [];
	console.log('name:' + name + 'email:' + email + 'password:' + password);

	if(!name || !email || !password || !password2) {
		errors.push({msg : 'please fill in all field'});
	}

	//check if match
	if(password !== password2) {
		errors.push({msg : 'passwords dont match'});
	}

	//check if password is more than 6 characters
	if(password.length < 6) {
		errors.push({msg : 'password at least 6 characters'});
	}

	else{
		User.findOne({email : email}).exec((err, user) => {
			console.log(user);
			
			if(user) {

			}

			else{
				var newUser = new User({
					name : name,
					email : email,
					password : password
				});
			}

			bcrypt.genSalt(10, (err, salt) =>
			bcrypt.hash(newUser.password, salt,
				(err, hash)=> {
					if(err) throw err;
					//save pass to hash
					newUser.password = hash;
					//save user
					newUser.save().then((value)=>{
						console.log(value)
						res.redirect('/user/login');
					}).catch(value=> console.log(value));
				}));
		});
	}
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/user/login');
});

module.exports = router;
