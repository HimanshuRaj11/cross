import mongoose, { Schema, model, models, Model, Document } from 'mongoose';

interface IProfilePic {
    public_id: string;
    file?: string;
}

interface IRecentActivity {
    postId: mongoose.Schema.Types.ObjectId;
    interactionType: 'view' | 'like' | 'share' | 'comment';
    timestamp: Date;
}

export interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    countryCode?: string;
    country?: string,
    city?: string,
    isVerfied: boolean;
    bio?: string;
    dateOfBirth?: number;
    gender?: 'Male' | 'Female' | 'Other';
    interests: string[];
    posts: mongoose.Schema.Types.ObjectId[];
    chats: mongoose.Schema.Types.ObjectId[];
    recentActivity: IRecentActivity[];
    profilePic?: IProfilePic;
    banner?: IProfilePic;
    followers: mongoose.Schema.Types.ObjectId[];
    followings: mongoose.Schema.Types.ObjectId[];
    savedPost: mongoose.Schema.Types.ObjectId[];
}

const countryCodes: Record<string, string> = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    AU: 'Australia',
    IN: 'India',
    // Add more country codes and names as needed
};

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    countryCode: {
        type: String,
        enum: Object.keys(countryCodes),
        required: false,
    },
    country: {
        type: String
    },
    city: { type: String },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        trim: true,
    },
    dateOfBirth: { type: Date },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    interests: [String],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }],
    recentActivity: [{
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts"
        },
        interactionType: { type: String, enum: ['view', 'like', 'share', 'comment'] },
        timestamp: { type: Date, default: Date.now }
    }],
    profilePic: {
        public_id: {
            type: String,
            trim: true,
        },
        file: {
            type: String,
            required: false,
            trim: true,
        }
    },
    banner: {
        public_id: {
            type: String,
            trim: true,
        },
        file: {
            type: String,
            required: false,
            trim: true,
        }
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    savedPost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, { timestamps: true });

const User: Model<IUser> = models.User || model('User', UserSchema);
export default User;