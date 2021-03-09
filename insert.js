const mongoose = require('mongoose');
const {User,Profile} = require('./model');
let uri = 'mongodb://127.0.0.1:27017/test'
const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

let data = [];

for(let i=0;i<5;i++){
    const tempUser = {
        firstName: `rajat ${i}`,
        lastName: 'verma',
        email: `rajat${i}@gmail.com`,
        password: `rajat ${i}`,
    }
    data.push(tempUser);
}

console.log(data);

let dob = ["25/12/2000","23/11/1989","30/1/1985","5/5/2005","4/7/2010"]

 const  insertData = ()=>{
    return new Promise(async(resolve,reject)=>{
      await  Promise.all(data.map(async(record,index)=>{
        try{
            let newuser = new User(record);
           const saveuser = await newuser.save();
           //console.log(saveuser);
           let tempprofile = {
               userId:saveuser._id,
               dob:dob[index],
               phone:7895632155
           }
           //console.log('temp',tempprofile);
           let newprofile = new Profile(tempprofile);
           const saveprofile = await newprofile.save();
           console.log(saveprofile)
        }
        catch(err){
            console.log(err)
        }
        }))
        resolve('comleted');
    })
}

insertData().then((response)=>{
    console.log(response);
}).catch((err)=>{
    console.log(err)
})