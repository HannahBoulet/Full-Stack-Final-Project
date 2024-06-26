import { Schema, model, Types } from "mongoose"

export default interface User {
    userName: String,
    shoppingCart?: Types.ObjectId[],
    oldOrderCart?: Types.ObjectId[],

}
export interface IUser {
    userName: string,
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    oldOrderCart: [{ type: Schema.Types.ObjectId, ref: 'Item' }]

}
