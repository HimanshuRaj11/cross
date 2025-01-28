import mongoose, { Model, model, models, Schema } from "mongoose";

export interface Imessage {
    _id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    message: string
}

const MessageSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    message: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true })

const Message: Model<Imessage> = models.Message || model("Message", MessageSchema)
export default Message