import mongoose, { Schema, models, model } from "mongoose";

export type RequestStatus =
  | "pending"
  | "approved"
  | "completed"
  | "rejected";

  //schema is just a definition/blueprint of what data should look like
const RequestSchema = new Schema(
  {
    requestorName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    itemRequested: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "rejected"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  }
);

const Request = models.Request || model("Request", RequestSchema);
export default Request;
