// models/GeneratedResponse.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the Mongoose schema
interface GeneratedResponse extends Document {
  prompt: string;
  response: string;
}

const GeneratedResponseSchema = new Schema<GeneratedResponse>({
  prompt: { type: String, required: true },
  response: { type: String, required: true },
});

const GeneratedResponseModel = mongoose.model<GeneratedResponse>(
  "GeneratedResponse",
  GeneratedResponseSchema
);

export default GeneratedResponseModel;
