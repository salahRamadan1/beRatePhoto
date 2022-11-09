const userModel = require("../../models/userModel/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sendEmail = require("../../sendEmail/emailCon");
const { createTryAndCatch } = require("../../commen/catchAsyncError");

// sign up
module.exports.signUp = createTryAndCatch(async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email already exits" });
  } else {
    bcrypt.hash(password, Number(process.env.SALT), async (err, hash) => {
      if (err) {
        res.json({ message: "err", err });
      } else {
        const userNew = await userModel.insertMany({
          first_name,
          last_name,
          email,
          password: hash,
          age,
        });
        var token = jwt.sign({ email }, process.env.SECRETTOKENCONFEMAIL);
        let message = `<a href=http://localhost:3000/user/verify/${token}>click here</a>`;

        sendEmail({ email, message });

        res.json({ message: "success" });
      }
    });
  }
});
// sign in 
module.exports.signIn = createTryAndCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign({ user }, process.env.SECRITTOKEN);
      if (user.emailConfirm == true) {
        res.json({ message: "success", token });
      } else {
        res.json({
          message: "please active your account (chick your account gmail )",
        });
      }
    } else {
      res.json({ message: "password incorrect" });
    }
  } else {
    res.json({ message: "user not found" });
  }
});
// verify
module.exports.verifyEmail =  (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.SECRETTOKENCONFEMAIL, async (err, decoded) => {
    if (err) {
      res.json({ err });
    } else {
      let user = await userModel.findOne({ email: decoded.email });
      if (user) {
        await userModel.findOneAndUpdate(
          { email: decoded.email },
          { emailConfirm: true }
        );
        res.json({ message: "verified" });
      } else {
        res.json({ message: "user not found" });
      }
    }
  });
};
// update profile picture
module.exports.profilePic = createTryAndCatch(async (req, res) => {
  const { createdBy } = req.body;
  if (req.file) {
    await userModel.findOneAndUpdate(
      { createdBy },
      { profile_Pic: req.file.filename, createdBy }
    );
    res.json({ message: "success" });
  } else {
    res.json({ message: "img only" });
  }
});
module.exports.getUser = createTryAndCatch(async (req, res) => {
  const createdBy = req.header("createdBy");
  const user = await userModel.findOne({ createdBy });
  res.json({ message: "success", user });
});
