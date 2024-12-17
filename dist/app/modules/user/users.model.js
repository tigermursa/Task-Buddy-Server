"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Tasks Schema here
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userImage: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
});
// // Middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//     const user = this as Document & TUser;
//     if (!user.isModified('password')) return next();
//     try {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         user.password = hashedPassword;
//         next();
//     } catch (error: any) {
//         return next(error);
//     }
// });
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
userSchema.statics.isUserExists = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield this.findOne({ email });
        return existingUser;
    });
};
const UserModel = (0, mongoose_1.model)('user', userSchema);
exports.default = UserModel;
