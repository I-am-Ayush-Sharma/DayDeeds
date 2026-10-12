import mongoose, { Schema, type Document, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const plain = ret as Record<string, unknown>;
    delete plain.passwordHash;
    delete plain.__v;
    return plain;
  },
});

export type UserRole = "user" | "admin";
export type UserDocument = Document & InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
