// dependencies 
const mongoose = require('mongoose'); 
const passportLocalMongoose = require('passport-local-mongoose');

// connect to database
const uri = 'mongodb://Ginko:tokoyama@cluster0-shard-00-00.mmlv1.mongodb.net:27017,cluster0-shard-00-01.mmlv1.mongodb.net:27017,cluster0-shard-00-02.mmlv1.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-vogjwj-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

// create model
const User = new mongoose.Schema({
 name :{
     type : String,
     required : [true, 'name field required']
 } ,
 email :{
     type : String,
     required : [true, 'email field required']
 } ,
 password :{
     type : String,
     required : true,
minLength: [6, 'password length can not be less than 6 character']
 } ,
 date :{
     type : Date,
     default : Date.now
 }
});

/*User.pre('save', function(){

  this.password = "123456789";
})*/

// Export Model
User.plugin(passportLocalMongoose); 

module.exports = mongoose.model('userData', User, 'userData');

// Test data
/*UserDetails.register({ username: 'candy', active: false }, 'cane'); UserDetails.register({ username: 'starbuck', active: false }, 'redeye');*/
