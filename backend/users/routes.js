const express = require("express");
const router = express.Router();
const { UserValidate } = require("./validations");
const { UserView } = require("./views");
const Token = require("../core/helper/authentication/token");

// Routes beginning with /api/user
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *         UserName:
 *           type: string
 *         Type:
 *           type: string
 *           enum: [Admin, Organization, Staff]
 *         Email:
 *           type: string
 *           format: email
 *         PhoneNumber:
 *           type: string
 *         Password:
 *           type: string
 *         Status:
 *           type: string
 *           enum: [InActive, Active, Banned]
 *       required:
 *         - Name
 *         - UserName
 *         - Email
 *         - Password
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: Invalid request payload
 */

router.post("/signup", UserValidate.Create, UserView.CreateOrganization);
router.post(
  "/staffcreate",
  Token.Auth,
  UserValidate.Create,
  UserView.CreateStaff
);
router.post("/signin", UserValidate.Login, UserView.SignIn);
router.get("/verifyApiKey", Token.Auth, UserView.VerifyToken);
router.get("/users", Token.Auth, UserView.Users);
router.delete("/staff/:userId", Token.Auth, UserView.DeleteStaff);

module.exports = router;
