// models/GeneratedResponse.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the Mongoose schema interface
interface GeneratedResponse extends Document {
  prompt: string;
  response: string;
  tool: string;
  responseRaw: any;
}

// Define the schema for generated responses
const GeneratedResponseSchema = new Schema<GeneratedResponse>(
  {
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    tool: { type: String, required: true },
    responseRaw: { type: Object, required: true },
  },
  { timestamps: true }
);

// Prevent model overwrite by checking if it exists
const GeneratedResponseModel =
  mongoose.models.GeneratedResponse ||
  mongoose.model<GeneratedResponse>(
    "GeneratedResponse",
    GeneratedResponseSchema
  );

export default GeneratedResponseModel;
