import { Schema, model, models, Model, Document } from 'mongoose';
import { Ifile } from './post.model';
const file = {
    asset_id: { type: String, },
    public_id: { type: String, },
    version: { type: Number, },
    version_id: { type: String, },
    signature: { type: String, },
    width: { type: Number },
    height: { type: Number, },
    format: { type: String, },
    resource_type: { type: String, },
    created_at: { type: String, },
    bytes: { type: Number, },
    type: { type: String, },
    etag: { type: String, },
    placeholder: { type: Boolean, },
    url: { type: String, },
    secure_url: { type: String, },
    folder: { type: String, },
    api_key: { type: String, },
}

export interface IStory {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    files?: Ifile[];
    createdAt: Date | string;
}

const StoriesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    files: [file],
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }, { timestamps: true }]
}, { timestamps: true })

const Story: Model<IStory & Document> = models.Story || model("Story", StoriesSchema)

export default Story;