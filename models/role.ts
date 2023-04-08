import { Schema, model, models } from "mongoose"

const RoleSchema = new Schema({
    password: {
        type: String,
        required: [true, "address is required"],
    }
})

const Role = models.Role || model("Role", RoleSchema)

export default Role
