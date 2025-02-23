import { IUser } from '@/models/user.model';

import { Schema, model, models, Model, Document } from 'mongoose';

export interface Ifile {
    public_id: string;
    asset_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    api_key: string;
}
export interface IReel {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    files?: Ifile;
    caption?: string;
    location?: string;
    colabWith?: Schema.Types.ObjectId[];
    tags?: string[];
    tagPeople?: Schema.Types.ObjectId[];
    music?: string;
    likes?: Schema.Types.ObjectId[];
    comments?: Schema.Types.ObjectId[];
    views?: Schema.Types.ObjectId[];
    createdAt: Date | string;
}

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

const ReelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    files: file,
    caption: {
        type: String,
        trim: true
    },
    location: {
        type: String,
    },
    colabWith: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    tags: [{
        type: String,
    }],
    tagPeople: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    music: {
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    views: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

const Reel: Model<IReel & Document> = models.Reel || model("Reel", ReelSchema)

export default Reel;