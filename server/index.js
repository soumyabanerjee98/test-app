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
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname.split(".")[0].toString() +
        "-" +
        uniqueSuffix +
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

app.post("/generatetoken", async (req, res) => {
  const user = await users.findOne({ username: req?.body?.username });
  if (user) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "Token is already generated for this user",
    });
    return;
  }
  const generateToken = jwt.sign(
    { username: req?.body?.username },
    process.env.JWT_SECRET_TOKEN
  );
  const newUser = new users({
    username: req?.body?.username,
  });
  await newUser.save();
  res?.send({
    ...this.returnJSONsuccess,
    returnData: generateToken,
    msg: "New token generated. Keep it safe!",
  });
});

app.post("/login", async (req, res) => {
  const user = await users.findOne({ username: req?.body?.username });
  if (user === null) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "No such user found",
    });
    return;
  }
  try {
    const verifyToken = jwt.verify(
      req?.body?.token,
      process.env.JWT_SECRET_TOKEN
    );
    if (verifyToken) {
      if (verifyToken?.username === req?.body?.username) {
        let userfiles = await files?.find({ user: req?.body?.username });
        userfiles.reverse();
        res?.send({
          ...this.returnJSONsuccess,
          returnData: { username: req?.body?.username, files: userfiles },
          msg: "Logged in successfully!",
        });
        return;
      }
      res?.send({
        ...this.returnJSONfailure,
        msg: "Invalid token!",
      });
      return;
    }
    res?.send({
      ...this.returnJSONfailure,
      msg: "Invalid token!",
    });
  } catch (error) {
    res?.send({
      ...this.returnJSONfailure,
      msg: "Invalid token!",
    });
  }
});

app.post("/upload", async (req, res) => {
  try {
    let dir = __dirname + "/files";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
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
      const user = req.headers?.username;
      const event = new Date();
      const fileArr = req.files;
      await files.insertMany(
        fileArr.map((v) => {
          return {
            user: user,
            name: v?.filename,
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
        returnData: { username: user, files: allfiles },
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
