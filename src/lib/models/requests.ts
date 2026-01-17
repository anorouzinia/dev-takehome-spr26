// // lib/models/requests.ts
import mongoose, { Schema, Model } from "mongoose";

export interface IRequest {
  requestorName: string;
  itemRequested: string;
  status: "pending" | "approved" | "completed" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<IRequest>(
  {
    requestorName: { type: String, required: true },
    itemRequested: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Request: Model<IRequest> =
  mongoose.models.Request ||
  mongoose.model<IRequest>("Request", RequestSchema);

export default Request;
