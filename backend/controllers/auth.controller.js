const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/auth.model");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");

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

    // checks if the file is valid
    const isValid = isFileValid(image);

    if (!isValid) {
      // throes error if file isn't valid
      return res.status(400).json({
        status: "Fail",
        message: "The file type is not a valid type",
      });
    }

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
        errors: error,
      });
    }

    const getImageName = files.image.originalFilename;
    const newImageName = new Date().getTime() + "_" + getImageName;

    try {
      const checkUser = await registerModel.findOne({ email: email });

      if (checkUser) {
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
        image: image.originalFilename,
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Fail",
        errorMessage: error.message,
      });
    }
  });
};
