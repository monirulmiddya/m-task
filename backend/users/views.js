const { User, UserStaff } = require("./models");
const bcrypt = require("bcrypt");
const Token = require("../core/helper/authentication/token");

class UserView {
  CreateOrganization = async (req, res) => {
    try {
      const { name, userName, password, email, phoneNumber } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        Name: name,
        UserName: userName,
        Type: "Organization",
        Email: email,
        PhoneNumber: phoneNumber ?? null,
        Password: hashedPassword,
      };
      const user = await User.create(userData);
      if (user) {
        return res.Resp.Success(user.id, "Account has been created");
      } else {
        return res.Resp.Failed("Account Creating Failed");
      }
    } catch (error) {
      return res.Resp.Error();
    }
  };

  CreateStaff = async (req, res) => {
    let newUser;
    try {
      const USER = req.CurrentUser;
      const ORG = req.Organization;
      const { name, userName, password, email, phoneNumber } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        Name: name,
        UserName: userName,
        Type: "Staff",
        Email: email,
        PhoneNumber: phoneNumber ?? null,
        Password: hashedPassword,
      };
      let isCreated = false;
      newUser = await User.create(userData);
      if (newUser) {
        let userStaff;
        try {
          userStaff = await UserStaff.create({
            Organization: ORG._id,
            Staff: newUser._id,
          });
        } catch (validationError) {
          // delete the user -> my recomendtion will it move to queue system
          if (newUser) await newUser.deleteOne();
          return res.Resp.Forbidden(validationError.message);
        }

        if (userStaff) {
          isCreated = true;
        } else {
          // Delete the user
          if (newUser) await newUser.deleteOne();
        }
      }

      if (isCreated) {
        return res.Resp.Success(newUser._id, "Account has been created");
      } else {
        return res.Resp.Failed("Account Creating Failed");
      }
    } catch (error) {
      if (newUser) await newUser.deleteOne();
      return res.Resp.Error(error.message);
    }
  };

  SignIn = async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ UserName: userName });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.Password);
        if (isMatch) {
          const token = Token.Create({ _id: user._id });
          const modifiedUser = {
            ...user.toObject(),
            Password: undefined,
            token: token,
          };
          return res.Resp.Success(modifiedUser, "Sign In successfully");
        } else {
          return res.Resp.Forbidden("Username or password incorrect");
        }
      } else {
        return res.Resp.Forbidden("Username or password incorrect");
      }
    } catch (err) {
      return res.Resp.Error();
    }
  };

  VerifyToken = async (req, res) => {
    try {
      const user = await User.findById(req.CurrentUser._id).select("-Password");
      if (user) {
        return res.Resp.Success(user, "Authorized token");
      } else {
        return res.Resp.Unauthorized();
      }
    } catch (err) {
      return res.Resp.Error();
    }
  };

  Users = async (req, res) => {
    try {
      const USER = req.CurrentUser;
      const ORG = req.Organization;

      // Find all staff members associated with the organization
      const staffMembers = await UserStaff.find({
        Organization: ORG._id,
      })
        .populate({
          path: "Organization",
          select: "Name",
          options: { lean: true },
        })
        .populate({
          path: "Staff",
          select: "Name UserName Type Email PhoneNumber Status",
          options: { lean: true },
        });

      if (staffMembers.length > 0) {
        return res.Resp.Success(staffMembers, "Data fetched successfully");
      } else {
        return res.Resp.NotFound("Data not available");
      }
    } catch (err) {
      // throw new Error(error);
      return res.Resp.Error();
    }
  };

  DeleteStaff = async (req, res) => {
    try {
      const { userId } = req.params;
      const USER = req.CurrentUser;
      const ORG = req.Organization;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.Resp.NotFound("User not found");
      }

      // Check if the user is a staff member in any organization
      const userStaff = await UserStaff.findOne({
        Organization: ORG._id,
        Staff: userId,
      });

      // If the user is a staff member, remove the reference from UserStaff
      if (userStaff) {
        await userStaff.deleteOne();
      } else {
        return res.Resp.NotFound("User not found");
      }

      // Delete the user
      await user.deleteOne();

      return res.Resp.Success(userId, "User has been deleted successfully");
    } catch (error) {
      return res.Resp.Error(error.message);
    }
  };
}

module.exports = {
  UserView: new UserView(),
};
