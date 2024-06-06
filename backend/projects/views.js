const mongoose = require("mongoose");
const { Project, ProjectAssign } = require("./models");

class ProjectView {
  Create = async (req, res) => {
    try {
      const USER = req.CurrentUser;
      const ORG = req.Organization;
      const { projectName, projectCode, notes, status } = req.body;
      const projectData = {
        ProjectName: projectName,
        ProjectCode: projectCode,
        Notes: notes,
        Organization: ORG._id,
        Status: status,
      };
      const project = await Project.create(projectData);
      if (project) {
        return res.Resp.Success(project._id, "Project has been created");
      } else {
        return res.Resp.Failed("Project Creating Failed");
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.Resp.Forbidden(validationError.message);
      } else {
        return res.Resp.Error();
      }
    }
  };

  GetAll = async (req, res) => {
    try {
      const USER = req.CurrentUser;
      const ORG = req.Organization;

      const AllProject = await Project.find({
        Organization: ORG._id,
      }).populate({
        path: "Organization",
        select: "Name",
      });

      if (AllProject.length > 0) {
        return res.Resp.Success(AllProject, "Data fetched successfully");
      } else {
        return res.Resp.NotFound("Data not available");
      }
    } catch (error) {
      return res.Resp.Error();
    }
  };

  GetAllAssign = async (req, res) => {
    try {
      // console.log("Request params:", req.params); // Debugging statement
      const { projectId } = req.params;
      // console.log("Extracted projectId:", projectId); // Debugging statement

      // return res.Resp.Success(req.params, "Data fetched successfully");

      if (!projectId) {
        return res.Resp.BadRequest("Project ID is required");
      }

      const USER = req.CurrentUser;
      const ORG = req.Organization;

      const assignProjectUsers = await ProjectAssign.find({
        Organization: ORG._id,
        Project: projectId,
      }).populate({
        path: "Staff",
        select: "Name UserName Type Email PhoneNumber Status",
        options: { lean: true },
      }).populate({
        path: "Project",
        select: "ProjectName ProjectCode Status",
        options: { lean: true },
      });

      if (assignProjectUsers.length > 0) {
        return res.Resp.Success(
          assignProjectUsers,
          "Data fetched successfully"
        );
      } else {
        return res.Resp.NotFound("Data not available");
      }
    } catch (error) {
      //throw new Error(error);
      return res.Resp.Error();
    }
  };

  Assign = async (req, res) => {
    try {
      const USER = req.CurrentUser;
      const ORG = req.Organization;
      const { project, role, staff } = req.body;
      const assignData = {
        Organization: ORG._id,
        Role: role,
        Project: project,
        Staff: staff,
      };
      const assign = await ProjectAssign.create(assignData);
      if (assign) {
        return res.Resp.Success(assign._id, "Successfully assigned to project");
      } else {
        return res.Resp.Failed("Project assign Failed");
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.Resp.Forbidden(validationError.message);
      } else {
        return res.Resp.Error();
      }
    }
  };
}

module.exports = {
  ProjectView: new ProjectView(),
};
