
import mongoose, { Schema, Model, models, model } from "mongoose";

export interface IChat {
    messages: Schema.Types.ObjectId,
    users: Schema.Types.ObjectId,
}

const ChatSchema = new mongoose.Schema({
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }],
    users: [{
        require: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

const Chat: Model<IChat> = models.Chat || model("Chat", ChatSchema)

export default Chat