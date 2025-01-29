import mongoose, { Model, model, models, Schema } from "mongoose";

export interface IMessage {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    message: string;
}

const MessageSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Message: Model<IMessage> = models.Message || model<IMessage>("Message", MessageSchema);
export default Message;
