const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const userProfileSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dob:{
        type:String
    },
    phone:{
        type:Number
    }
});

const User = mongoose.model('User',userSchema);
const Profile = mongoose.model('Profile',userProfileSchema);

module.exports={
    User,
    Profile
}