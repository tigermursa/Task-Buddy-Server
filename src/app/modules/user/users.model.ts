import { Schema, model } from "mongoose";
import { TUser, UserWithStatic } from "./users.interface";



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