const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

class Validator {
  Email = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  ObjectId = (string) => {
    return mongoose.Types.ObjectId.isValid(string);
  };

  Body = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.Resp.Forbidden("Validation Error", errors.array());
    }
    // If validation passes, proceed to the next middleware
    next();
  };
}

module.exports = Validator;
