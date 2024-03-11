import { Schema, Document, model } from "mongoose"

import { IUser } from "./user.models";
export interface IOrder extends Document {

    userName: IUser['userName'],
    cart: Object,
    addres: String,
    paymentId: String
}

const orderSchema: Schema = new Schema({
    cart: {
        type: Schema.Types.ObjectId, ref: 'Cart',
        required: true
    },
    userName:
    {
        type: Schema.Types.ObjectId, ref: 'UserName',
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    paymentId:
    {
        type: String,
        required: true
    },

})

export default model<IOrder>('Item', orderSchema);
