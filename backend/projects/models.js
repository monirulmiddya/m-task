const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("../users/models");

// Task Schema
const projectSchema = new Schema(
  {
    ProjectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    ProjectCode: {
      type: String,
      required: [true, "Project code is required"],
      trim: true,
    },
    Notes: {
      type: String,
      default: "",
    },
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
    Status: {
      type: String,
      enum: ["NotStarted", "Ongoing", "Completed", "Hold"],
      default: "NotStarted",
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
projectSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const Project = mongoose.model("Projects", projectSchema);

const projectsStaffSchema = new mongoose.Schema(
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
    Role: {
      type: String,
      default: "",
    },
    Project: {
      type: Schema.Types.ObjectId,
      ref: "Projects",
      validate: {
        validator: async function (objId) {
          // Check if the referenced user has the type "Org"
          const project = await Project.findOne({
            _id: objId,
          });
          return project !== null;
        },
        message: "Project not available within Organization",
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
projectsStaffSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const ProjectAssign = mongoose.model("ProjectsStaffs", projectsStaffSchema);

module.exports = { Project, ProjectAssign };
