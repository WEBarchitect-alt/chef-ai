import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  favorites: Array,
});

export default mongoose.model("User", userSchema);