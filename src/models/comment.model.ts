import { Schema, model, models, Model } from 'mongoose';

export interface IComment {
    user: Schema.Types.ObjectId,
    Comment: string,
    likes?: [Schema.Types.ObjectId],
    replies?: [Schema.Types.ObjectId]
    _id: Schema.Types.ObjectId
}

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Comment: {
        type: String,
        required: true,
        trim: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }, { timestamps: true }],
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "Reply",
    }]
}, { timestamps: true })

const Comment: Model<IComment> = models.Comment || model("Comment", CommentSchema)

export default Comment;