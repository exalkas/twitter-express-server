import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    city: String,
    country: String,
    age: Number,
    hobbies: [String],
    gender: String,
  },
  { timeStamps: true }
);

export default mongoose.model("User", userSchema);
