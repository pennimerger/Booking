import mongoose from "mongoose"
import { UpdateQuery } from "mongoose"
import bcrypt from "bcryptjs"
import { UserType } from "../shared/types"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate()
  
  if (update && typeof update === 'object' && 'password' in update) {
    const updateQuery = update as UpdateQuery<any>
    if (updateQuery.password) {
      updateQuery.password = await bcrypt.hash(updateQuery.password, 8)
    }
  }
  
  next()
})

const User = mongoose.model<UserType>("User", userSchema)

export default User