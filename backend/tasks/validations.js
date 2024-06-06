const { body } = require("express-validator");
const Validator = require("../core/helper/validation/validator");

class TaskValidate extends Validator {
  constructor() {
    super();
  }
  Create = [
    body("title")
      .exists({ checkFalsy: true })
      .withMessage("Title is required")
      .isString()
      .withMessage("Title should be string"),
    body("content")
      .exists({ checkFalsy: true })
      .withMessage("Content is required")
      .isString()
      .withMessage("Content should be string"),
    body("priority")
      .exists({ checkFalsy: true })
      .withMessage("Priority is required")
      .isString()
      .withMessage("Priority should be string")
      .isIn(["Lowest", "Low", "Medium", "High", "Highest"])
      .withMessage("Invalid priority value"),
    // body auto validate when use given validation const
    this.Body,
  ];
}

module.exports = {
  TaskValidate: new TaskValidate(),
};
