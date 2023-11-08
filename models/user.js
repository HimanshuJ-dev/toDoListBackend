const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  taskNo: {
    type: Number,
    default: 0,
  },
  tasks: {
    type: Schema.Types.ObjectId,
    ref: "Task"
  },
});

module.exports = mongoose.model('User', userSchema);
