const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/auth.model");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

const isFileValid = (file) => {
  const type = file.originalFilename.split(".").pop();
  const validTypes = ["jpg", "jpeg", "png"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

module.exports.userRegister = (req, res) => {
  const form = new formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, "../public", "image");
  //   form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;

  form.parse(req, async (err, fields, files) => {
    const { username, email, password, confirmPassword } = fields;
    const { image } = files;
    const error = [];

    if (!username) {
      error.push("Please provide your username");
    }
    if (!email) {
      error.push("Please provide your email");
    }
    if (email && !validator.default.isEmail(email)) {
      error.push("Please provide your username");
    }
    if (!password) {
      error.push("Please provide your password");
    }
    if (!confirmPassword) {
      error.push("Please provide your confirm password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Your password and confirm password are not same");
    }
    if (password && password.length < 6) {
      error.push("Please provide password must be greater than 6 characters");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide user image");
    }
    if (error.length > 0) {
      return res.status(400).json({
        status: "Fail",
        errorMessage: error,
      });
    }

    // checks if the file is valid
    const isValid = isFileValid(image);

    if (!isValid) {
      fs.unlinkSync(image.filepath);
      // throes error if file isn't valid
      return res.status(400).json({
        status: "Fail",
        message: "The file type is not a valid type",
      });
    }

    const getImageName = files.image.originalFilename;
    const newImageName = new Date().getTime() + "_" + getImageName;

    try {
      const checkUser = await registerModel.findOne({ email: email });

      if (checkUser) {
        fs.unlinkSync(image.filepath);
        return res.status(404).json({
          error: { errorMessage: "Your email has aleady exists" },
        });
      }

      fs.renameSync(image.filepath, path.join(uploadFolder, newImageName));
      files.image.originalFilename = newImageName;
      files.image.filepath =
        process.cwd() + `/server/public/image/${files.image.originalFilename}`;
      const newUser = await registerModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        image: "/image/" + image.originalFilename,
      });

      const payload = {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        image: newUser.image,
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      res
        .status(200)
        .cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          expires: new Date(
            Date.now() + process.env.TOKEN_AGE * 24 * 60 * 60 * 1000
          ),
        })
        .json({
          status: "Success",
          message: "Your register successful",
          token,
        });
    } catch (error) {
      console.log(error);
      fs.unlinkSync(image.filepath);
      res.status(500).json({
        status: "Fail",
        errorMessage: error.message,
      });
    }
  });
};
