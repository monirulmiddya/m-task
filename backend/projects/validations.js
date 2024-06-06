const { body } = require("express-validator");
const Validator = require("../core/helper/validation/validator");

class ProjectValidate extends Validator {
  constructor() {
    super();
  }
  Create = [
    body("projectName")
      .exists({ checkFalsy: true })
      .withMessage("Project name is required")
      .isString()
      .withMessage("Project name should be string"),
    body("projectCode")
      .exists({ checkFalsy: true })
      .withMessage("Project code is required")
      .isString()
      .withMessage("Project code should be string"),
    body("notes").isString().withMessage("Notes should be string"),
    body("status")
      .exists({ checkFalsy: true })
      .withMessage("Status is required")
      .isString()
      .withMessage("Status should be string")
      .isIn(["NotStarted", "Ongoing", "Completed", "Hold"])
      .withMessage("Invalid Status value"),
    // body auto validate when use given validation const
    this.Body,
  ];
}

module.exports = {
  ProjectValidate: new ProjectValidate(),
};
