const express = require("express");
const router = express.Router();
const { TaskValidate } = require("./validations");
const { TaskView } = require("./views");
const Token = require("../core/helper/authentication/token");

router.post("/create", Token.Auth, TaskValidate.Create, TaskView.Create);
router.get("/get_all/:project", Token.Auth, TaskView.GetAll);

module.exports = router;
