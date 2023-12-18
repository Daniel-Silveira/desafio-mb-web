import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
  },
  cpf: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ["PF", "PJ"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  initialDate: {
    type: String,
  },
  cnpj: {
    type: String,
  },
  socialName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
