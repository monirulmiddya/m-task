const express = require("express");
const router = express.Router();
const { ProjectValidate } = require("./validations");
const { ProjectView } = require("./views");
const Token = require("../core/helper/authentication/token");

router.post("/create", Token.Auth, ProjectValidate.Create, ProjectView.Create);
router.post("/assign", Token.Auth, ProjectView.Assign);
router.get("/get_all_assign/:projectId", Token.Auth, ProjectView.GetAllAssign);
router.get("/get_all", Token.Auth, ProjectView.GetAll);

module.exports = router;
