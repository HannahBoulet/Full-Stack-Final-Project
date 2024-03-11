import { Schema, Document, model } from "mongoose"

export interface IUser extends Document {

    firstlastname: String,
    userName: String,
    password: String
}

const userSchema: Schema = new Schema({
    firstlastname: {
        type: String,
        required: true
    },
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

})

export default model<IUser>('User', userSchema);
