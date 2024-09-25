const mongoose = require("mongoose");
const noteSchema = require("./note");

const projectSchema = new mongoose.Schema(
  {
    projTitle: {
      type: String,
      required: true,
    },
    img1: {
      type: String,
    },
    img2: {
      type: String,
    },
    img3: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    finishDate: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    link1: {
      type: String,
    },
    link2: {
      type: String,
    },
    link3: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    progress: {
      required: true,
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    priority: {
      required: true,
      type: String,
      enum: ["a", "b", "c", "d", "e", "f"],
    },
    private: {
      type: Boolean,
      default: false,
    },
    // buddies: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }],
    notes: [noteSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Project", projectSchema);
