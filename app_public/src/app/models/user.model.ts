import { Schema, model, Types } from "mongoose"

export default interface User {
    id: Types.ObjectId,
    userName: String,
    password: String,
    shoppingCart: Types.ObjectId[],
    v: String
}
export interface IUser {
    userName: String,
    password: String,
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}
