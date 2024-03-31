import { Schema, model, Document } from "mongoose";
import { TUser, UserWithStatic } from "./users.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


// Tasks Schema here
const userSchema = new Schema<TUser, UserWithStatic>(
    {
        name: { type: String, required: true },
        userImage: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    }
);





// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this as Document & TUser;
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, config.bcrypt_salt_rounds || "10");
        user.password = hashedPassword;
        next();
    } catch (error: any) {
        return next(error);
    }
});




//Query middle wears to update delete boolean value:

userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// the single value wont be available by aggregate by /hiding..(aggregate works on pipeline)
userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // if not equal = true , don't come
    next();
});

// NEW STATIC METHOD
userSchema.statics.isUserExists = async function (email: string): Promise<TUser | null> {
    const existingUser = await this.findOne({ email });
    return existingUser;
};
const UserModel = model<TUser, UserWithStatic>('user', userSchema);

export default UserModel;