const mongoose = require("mongoose");
const { User, Profile } = require("./model");
const bcrypt = require("bcrypt");
require("dotenv").config();
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    autoIndex: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Link established to database");
  })
  .catch(() => {
    console.log("No link to database.");
  });

let data = [];

for (let i = 0; i < 5; i++) {
  let pass = bcrypt.hashSync(`rajat ${i}`, 10);

  const newCreatedUser = {
    firstName: `rajat ${i}`,
    lastName: "verma",
    email: `rajat${i}@gmail.com`,
    password: pass,
  };
  data.push(newCreatedUser);
}

let dob = ["25/12/2000", "23/11/1989", "30/1/1985", "5/5/2005", "4/7/2010"];

const insertData = async () => {
  await Promise.all(
    data.map(async (record, index) => {
      try {
        let newuser = new User(record);
        const saveuser = await newuser.save();
        let newCreatedProfile = {
          userId: saveuser._id,
          dob: dob[index],
          createdAt: new Date(),
          phone: 7895632155,
        };
        let newprofile = new Profile(newCreatedProfile);
        await newprofile.save();
        return {
          newCreatedProfile
        };
      } catch (err) {
        throw err;
      }
    })
  );
};

insertData()
  .then(() => {
    console.log("data succesfully saved");
  })
  .catch(() => {
    console.log("some error");
  });

const removeUserOlderThan25 = async () => {
  try {
    let user = await Profile.find().populate("userId");
    await Promise.all(
      user.map(async (record, index) => {
        let age = new Date().getFullYear() - parseInt(record.dob.split("/")[2]);
        if (age >= 25) {
          await User.deleteOne({ _id: record.userId });
        }
      })
    );
  } catch (err) {
    throw err;
  }
};
removeUserOlderThan25()
  .then(() => {
    console.log("data succesfully deleted");
  })
  .catch(() => {
    console.log("some error");
  });
