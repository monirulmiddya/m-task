const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;
const { User, UserStaff } = require("../../../users/models");

class Token {
  static GetOUser = async (user) => {
    try {
      const { id, Type } = user;
      if (Type === "Staff") {
        const staff = await UserStaff.findOne({ Staff: id });

        let oUser = null;
        if (staff) {
          oUser = await User.findById(staff.Organization).select("-Password");
        }
        return oUser;
      } else {
        return user;
      }
    } catch (error) {
      return null;
    }
  };

  static Create = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET);
  };

  static Auth = async (req, res, next) => {
    try {
      const token = req.header("ApiKey");
      if (!token) return res.Resp.Unauthorized();
      let user = null;
      try {
        user = jwt.verify(token, ACCESS_TOKEN_SECRET);
      } catch (err) {
        return res.Resp.Unauthorized();
      }

      user = await User.findById(user._id);
      if (user) {
        let ouser = await Token.GetOUser(user);
        if (ouser == null) {
          return res.Resp.Error();
        }
        req.IsStaff = user.Type === "Staff";
        req.IsOrganization = user.Type === "Organization";
        req.CurrentUser = user;
        req.Organization = ouser;
        next();
      } else {
        return res.Resp.NotFound("User not available!");
      }
    } catch (error) {
      return res.Resp.Error();
    }
  };
}

module.exports = Token;
