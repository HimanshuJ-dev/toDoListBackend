const Task = require("../models/task");

exports.postAddTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const creator = req.body.creator;

  const task = new Task({
    title: title,
    description: description,
    priority: priority,
    creator: creator,
  });
  task
    .save()
    .then((result) => {
      console.log("task created");
      res.status(200).json({ message: "task created" });
    })
    .catch((err) => {
      console.log("could not create task");
      res.status(500).json({ message: "user not created" });
    });
};

exports.getTasks = (req, res, next) => {
    Task.find({ creator: req.query.id })
      .then((tasks) => {
          res.status(200).json({
          tasks: tasks
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.updateTasks = (req, res, next) => {
   const updatedTitle = req.body.title;
   const updatedDescription = req.body.description;
   const updatedPriority = req.body.priority;
   const creator = req.body.creator;
  Task.findById(req.body.id)
    .then(task => {
      if (task.creator.toString() !== creator) {
        return res.status(401).json({ message: "Not authorized to Edit" });
      }
      task.title = updatedTitle;
      task.description = updatedDescription;
      task.priority = updatedPriority;
      return task.save()
        .then(result => {
          res.status(200).json({ message: "product updated" });
      })
    }
  )
}

exports.deleteTask = (req, res, next) => {
  Task.findById(req.query.id)
    .then((task) => {
      if (!task) {
        return next(new Error("Product not found!"));
      }
      return Task.deleteOne({ _id: req.query.id });
    })
    .then(() => {
      res.status(200).json({ message: "task deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "deleting product failed." });
    });
}