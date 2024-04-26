import jwt, { Jwt } from 'jsonwebtoken';
import crypto from 'crypto';

import { Schema, Document, model, Types } from "mongoose";



export interface IUser extends Document {
    _id: Types.ObjectId,
    userName: string,

    hash: string,
    salt: string,
    setPassword: (pasword: string) => void,
    validPassword: (pasword: string) => boolean,
    generateJwt: () => Jwt,
    shoppingCart: String[],
    oldOrderCart: String[],

}

const userSchema: Schema = new Schema({

    userName:
    {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,

    shoppingCart: [{ type: String, ref: 'Item' }],
    oldOrderCart: [{ type: String, ref: 'Item' }]


});
userSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validPassword = function (password: string) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        userName: this.userName,
        exp: expiry.getTime() / 1000
    }, process.env.JWT_SECRET!);
};


export default model<IUser>('User', userSchema);
