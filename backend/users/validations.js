const { body } = require("express-validator");
const Validator = require("../core/helper/validation/validator");
const { User } = require("./models");

class UserValidate extends Validator {
  constructor() {
    super();
  }
  Create = [
    body("name")
      .exists({ checkFalsy: true })
      .withMessage("Name is required")
      .isString()
      .withMessage("User name should be string"),
    body("userName")
      .exists({ checkFalsy: true })
      .withMessage("Username is required")
      .isString()
      .withMessage("Username should be string")
      .custom(async (value) => {
        // Check if username already exists in the database
        const existingUser = await User.findOne({ UserName: value });
        if (existingUser) {
          throw new Error("Username is already in use");
        }
      }),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password should be string")
      .isLength({ min: 5 })
      .withMessage("Password should be at least 5 characters"),
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Provide valid email")
      .custom(async (value) => {
        // Check if username already exists in the database
        const existingUser = await User.findOne({ Email: value });
        if (existingUser) {
          throw new Error("Email is already in use");
        }
      }),
    //   body("type")
    //     .isString()
    //     .isIn(["Admin", "Org", "User"])
    //     .withMessage("Type should be Admin/Org/User"),
    body("phoneNumber")
      .optional()
      .isString()
      .withMessage("Phone number should be string")
      .custom((value) => {
        if (value.length !== 10) {
          return Promise.reject("Phone number should be 10 digits");
        } else {
          return true;
        }
      }),
    // body auto validate when use given validation const
    this.Body,
  ];

  Login = [
    body("userName").exists().withMessage("Username is required"),
    body("password").exists().withMessage("Password is required"),
    // body auto validate when use given validation const
    this.Body,
  ];
}

module.exports = {
  UserValidate: new UserValidate(),
};
