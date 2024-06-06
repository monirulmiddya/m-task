const mongoose = require("mongoose");
const { Task, Label, Status } = require("./models");

class TaskView {
  Create = async (req, res) => {
    try {
      const USER = req.CurrentUser;
      const ORG = req.Organization;
      const { title, content, priority, status, project } = req.body;
      const taskData = {
        Title: title,
        Content: content,
        Priority: priority,
        Project: project,
        Organization: ORG._id,
        Status: status,
      };
      const task = await Task.create(taskData);
      if (task) {
        return res.Resp.Success(task._id, "Task has been created");
      } else {
        return res.Resp.Failed("Task Creating Failed");
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
      const { project } = req.params;

      const AllTask = await Task.find({
        Organization: ORG._id,
        Project: project,
      }).populate({
        path: "Organization",
        select: "Name",
      });

      if (AllTask.length > 0) {
        return res.Resp.Success(AllTask, "Data fetched successfully");
      } else {
        return res.Resp.NotFound("Data not available");
      }
    } catch (error) {
      return res.Resp.Error();
    }
  };
}

module.exports = {
  TaskView: new TaskView(),
};
