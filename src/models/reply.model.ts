import { Schema, model, models, Model } from 'mongoose';

interface IReply {

    user: Schema.Types.ObjectId,
    reply: string,
    likes: [Schema.Types.ObjectId],

}

const ReplySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    tagUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reply: {
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true })


const Reply: Model<IReply> = models.Reply || model("Reply", ReplySchema)

export default Reply;