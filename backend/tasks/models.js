const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("../users/models");
const { Project } = require("../projects/models");

// Label Schema
const LabelSchema = new Schema(
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
    Label: {
      type: String,
      required: [true, "Label is required"],
      trim: true,
    },
    Note: {
      type: String,
      default: null,
    },
    Color: {
      type: String,
      enum: [
        "Red",
        "Green",
        "Blue",
        "Yellow",
        "Orange",
        "Purple",
        "Pink",
        "Cyan",
        "Magenta",
        "Black",
        "White",
        "Gray",
      ],
      default: "Gray",
    },
    Status: {
      type: String,
      enum: ["InActive", "Active"],
      default: "Active",
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
LabelSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const Label = mongoose.model("Labels", LabelSchema);

// Status Schema
const StatusSchema = new Schema(
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
    StatusName: {
      type: String,
      required: [true, "Status is required"],
      trim: true,
    },
    Note: {
      type: String,
      default: null,
    },
    Color: {
      type: String,
      enum: [
        "Red",
        "Green",
        "Blue",
        "Yellow",
        "Orange",
        "Purple",
        "Pink",
        "Cyan",
        "Magenta",
        "Black",
        "White",
        "Gray",
      ],
      default: "Gray",
    },
    Status: {
      type: String,
      enum: ["InActive", "Active"],
      default: "Active",
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
StatusSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const Status = mongoose.model("Status", StatusSchema);

// Task Schema
const taskSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    Content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    Priority: {
      type: String,
      enum: ["Lowest", "Low", "Medium", "High", "Highest"],
      default: "Medium",
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
    Project: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      validate: {
        validator: async function (ObjId) {
          // Check if the referenced user has the type "Org"
          const project = await Project.findOne({
            _id: ObjId,
          });
          return project !== null;
        },
        message: "Project is required",
      },
    },
    // Label: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Labels",
    //   default: null,
    // },
    // Status: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Status",
    //   default: null,
    // },
    Status: {
      type: String,
      enum: ["Pending", "Onging", "Completed"],
      default: "Pending",
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
taskSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  this.set({ UpdatedAt: now });
  next();
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = { Task, Label, Status };
