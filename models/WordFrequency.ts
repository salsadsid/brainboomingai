// models/WordFrequency.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the Mongoose schema interface
interface WordFrequency extends Document {
  word: string;
  frequency: number;
  prompt: string;
}

// Define the schema for word frequency
const WordFrequencySchema = new Schema<WordFrequency>({
  word: { type: String, required: true },
  frequency: { type: Number, required: true },
  prompt: { type: String, required: true },
});

// Prevent model overwrite by checking if it exists
const WordFrequencyModel =
  mongoose.models.WordFrequency ||
  mongoose.model<WordFrequency>("WordFrequency", WordFrequencySchema);

export default WordFrequencyModel;
