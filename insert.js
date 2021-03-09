const mongoose = require("mongoose");
const { User, Profile } = require("./model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const connection = mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let data = [];

for (let i = 0; i < 5; i++) {
  let pass = bcrypt.hashSync(`rajat ${i}`, 10);

  const tempUser = {
    firstName: `rajat ${i}`,
    lastName: "verma",
    email: `rajat${i}@gmail.com`,
    password: pass,
  };
  data.push(tempUser);
}

console.log(data);

let dob = ["25/12/2000", "23/11/1989", "30/1/1985", "5/5/2005", "4/7/2010"];

const insertData = async () => {
  await Promise.all(
    data.map(async (record, index) => {
      try {
        let newuser = new User(record);
        const saveuser = await newuser.save();
        let tempprofile = {
          userId: saveuser._id,
          dob: dob[index],
          phone: 7895632155,
        };
        let newprofile = new Profile(tempprofile);
        const saveprofile = await newprofile.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
};

insertData();