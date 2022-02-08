const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const User = require('./userModel.js');
//const app = express();

router.get('/login', (req, res) => {
    res.sendFile('./' + 'view/user/login');
});

router.get('/register', (req, res) => {
    res.sendFile('./' + '/view/user/register');
});

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send();
});

router.get('/logout', function(req, res){ 
    req.logout(); 
    res.redirect('/login'); 
});

router.post('/login', (req, res) => {
    const {name, email, password, password2} = req.body;
    
    User.findOne({email : email}).exec((err, user) => {
        if(user) {
            if(user.password == password) {
                console.log('login succesful');
                session = req.session;
                session.userId = email;
                console.log(req.session);
                res.send('Hey there, Welcome <a href="../view/user/logout">Click to logout</a>');
            } else {
                console.log('user not found')
                res.redirect('/user/register.html');
            }
        }
    })
});

router.post('/register', async (req, res) => {
    const {name, email, password, password2} = req.body;
  
    console.log('name:' + name + 'email:' + email + 'password:' + password);
    let user;
    
     try {
           user = await User.findOne({email});
           if (!user) {
               user = await User.create(req.body);
               console.log('success!');
            }
      }catch(err){
           console.log(err);
      }                    
});

module.exports = router;
