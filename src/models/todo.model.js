import mongoose from "mongoose";

/**
 * TODO: Define Todo schema
 *
 * Fields:
 * - title: String, required, trim, min 3, max 120 chars
 * - completed: Boolean, default false
 * - priority: Enum ["low", "medium", "high"], default "medium"
 * - tags: Array of Strings, max 10 items, default []
 * - dueDate: Date, optional
 *
 * Options:
 * - Enable timestamps
 * - Add index: { completed: 1, createdAt: -1 }
 */

const todoSchema = new mongoose.Schema(
  {
    // Your schema fields here
    title : {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title must be at most 120 characters"]
    },
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    dueDate: {
      type: Date
    },
    tags: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length <= 10;
        },
        message: "A todo can have at most 10 tags"
      },
      default: []
    }
  },
  {
    // Schema options here
    timestamps: true
  }
);

// TODO: Add index
todoSchema.index({ completed: 1, createdAt: -1 });

// TODO: Create and export the Todo model

export const Todo = mongoose.model("Todo", todoSchema);