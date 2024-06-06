const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    UserName: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    Type: {
      type: String,
      enum: ["Admin", "Organization", "Staff"],
      default: "Organization",
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    PhoneNumber: {
      type: String,
      trim: true,
      default: null,
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
    },
    Status: {
      type: String,
      enum: ["InActive", "Active", "Banned"],
      default: "InActive",
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
    UpdatedAt: {
      type: Date,
      default: null, // Default to null
    },
  },
  {
    timestamps: false,
  }
);

// Update the 'UpdatedAt' field before updating the document
userSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const User = mongoose.model("Users", userSchema);

const userStaffSchema = new mongoose.Schema(
  {
    Organization: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      validate: {
        validator: async function (orgId) {
          // Check if the referenced user has the type "Org"
          const user = await User.findOne({ _id: orgId, Type: "Organization" });
          return user !== null;
        },
        message: "Organization must reference a user with type 'Organization'",
      },
    },
    Staff: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      validate: {
        validator: async function (staffId) {
          // Check if the referenced user has the type "Org"
          const user = await User.findOne({ _id: staffId, Type: "Staff" });
          return user !== null;
        },
        message: "StaffId must reference a user with type 'Staff'",
      },
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
    UpdatedAt: {
      type: Date,
      default: null, // Default to null
    },
  },
  {
    timestamps: false,
  }
);

// Update the 'UpdatedAt' field before updating the document
userStaffSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const UserStaff = mongoose.model("UserStaffs", userStaffSchema);

module.exports = {
  User,
  UserStaff,
};
