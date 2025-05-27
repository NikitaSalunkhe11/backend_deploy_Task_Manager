const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["completed", "inprogress",  "pending"], 
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"], 
      default: "medium",
    },
    endDate: { type: Date }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
