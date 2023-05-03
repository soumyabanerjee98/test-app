const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const users = require("./models/users");
const files = require("./models/files");

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();

const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `files/${req?.headers?.user}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0].toString() +
        `.${file.mimetype.split("/")[1].toString()}`
    );
  },
});

const upload = multer({ storage: storage }).array("files");

module.exports.returnJSONsuccess = {
  returnCode: true,
  returnData: null,
  msg: null,
};

module.exports.returnJSONfailure = {
  returnCode: false,
  returnData: null,
  msg: null,
};

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("error in DB: ", err);
  });

app.use(express.static(__dirname + "/files"));

app.post("/register", async (req, res) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!req.body.email.match(validRegex)) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "Invalid email!",
    });
    return;
  }
  const user = await users.findOne({ email: req?.body?.email });
  if (user) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "User already exists!",
    });
    return;
  }
  const generateToken = jwt.sign(
    { password: req?.body?.password },
    process.env.JWT_SECRET_TOKEN
  );
  const dir = __dirname + "/files/" + req?.body.email;
  fs.mkdirSync(dir, { recursive: true });
  const newUser = new users({
    email: req?.body?.email,
    password: generateToken,
  });
  await newUser.save();
  let userfiles = await files.find({ user: req?.body?.email });
  userfiles.reverse();
  res?.send({
    ...this.returnJSONsuccess,
    returnData: { email: req?.body?.email, files: userfiles },
    msg: "New user registered!",
  });
});

app.post("/login", async (req, res) => {
  const user = await users.findOne({ email: req?.body?.email });
  if (user === null) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "No such user found!",
    });
    return;
  }
  try {
    const password = user.password;
    const verifyToken = jwt.verify(password, process.env.JWT_SECRET_TOKEN);
    if (verifyToken?.password === req?.body?.password) {
      let userfiles = await files?.find({ user: req?.body?.email });
      userfiles.reverse();
      res?.send({
        ...this.returnJSONsuccess,
        returnData: { email: req?.body?.email, files: userfiles },
        msg: "Logged in successfully!",
      });
      return;
    }
    res?.send({
      ...this.returnJSONfailure,
      msg: "Invalid password!",
    });
  } catch (error) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "Invalid password!",
    });
  }
});

app.post("/upload", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.send({
          ...this?.returnJSONfailure,
          msg: `Error: ${err}`,
        });
        return;
      }
      if (err) {
        res.send({
          ...this?.returnJSONfailure,
          msg: `Something went wrong: ${err}`,
        });
        return;
      }
      const user = req.headers?.user;
      const event = new Date();
      const fileArr = req.files;
      await files.insertMany(
        fileArr.map((v) => {
          return {
            user: user,
            name: v?.filename,
            path: `${user}/${v?.filename}`,
            format: v?.mimetype.split("/")[1],
            size: `${Math.floor(v?.size / 1000)} kb`,
            date: event.toString().split(" ", 5).join(" "),
          };
        })
      );
      let allfiles = await files.find({ user: user });
      allfiles.reverse();
      res.send({
        ...this?.returnJSONsuccess,
        returnData: { email: user, files: allfiles },
        msg: "File uploaded successfully!",
      });
    });
  } catch (error) {
    res.send({
      ...this?.returnJSONfailure,
      msg: `Something went wrong: ${error}`,
    });
  }
});

app.post("/delete", async (req, res) => {
  try {
    const targetfile = await files.findOne({ _id: req?.body?.fileId });
    const dir = __dirname + "/files";
    const filePath = dir + `/${targetfile?.path}`;
    fs.unlink(filePath, async (err) => {
      if (err) {
        res.send({
          ...this?.returnJSONfailure,
          msg: `${err}`,
        });
        return;
      }
      await files.findOneAndDelete({ _id: req?.body?.fileId });
      let allfiles = await files.find({ user: targetfile?.user });
      allfiles.reverse();
      res.send({
        ...this?.returnJSONsuccess,
        returnData: { email: targetfile?.user, files: allfiles },
        msg: "File deleted successfully!",
      });
    });
  } catch (error) {
    res.send({
      ...this?.returnJSONfailure,
      msg: `Something went wrong: ${error}`,
    });
  }
});

app.post("/update", async (req, res) => {
  try {
    const dir = __dirname + "/files";
    const targetfile = await files.findOne({ _id: req?.body?.fileId });
    const oldfilePath = dir + `/${targetfile?.path}`;
    const newFilePath = dir + `/${targetfile?.user}/${req?.body?.fileName}`;
    fs.rename(oldfilePath, newFilePath, async (err) => {
      if (err) {
        res.send({
          ...this?.returnJSONfailure,
          msg: `${err}`,
        });
        return;
      }
      await files.updateOne(
        { _id: req?.body?.fileId },
        {
          $set: {
            name: req?.body?.fileName,
            path: `${targetfile?.user}/${req?.body?.fileName}`,
          },
        }
      );
      let allfiles = await files.find({ user: targetfile?.user });
      allfiles.reverse();
      res.send({
        ...this?.returnJSONsuccess,
        returnData: { email: targetfile?.user, files: allfiles },
        msg: "File renamed successfully!",
      });
    });
  } catch (error) {
    res.send({
      ...this?.returnJSONfailure,
      msg: `Something went wrong: ${error}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
