import { Schema, Document, model, Types } from "mongoose"

export interface IUser extends Document {
    _id: Types.ObjectId,
    userName: String,
    password: String,
    shoppingCart: Types.ObjectId[],
    _v: String
}

const userSchema: Schema = new Schema({

    userName:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'Item' }]

})

export default model<IUser>('User', userSchema);
