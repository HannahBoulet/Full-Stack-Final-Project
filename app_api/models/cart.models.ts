import { Schema, Document, model } from "mongoose"

import { IUser } from "./user.models";
import { IItem } from "./items.models";
export interface ICart extends Document {

    itemName: IItem['itemName'],
    userName: IUser['userName'],
    price: IItem['price']
}

const cartSchema: Schema = new Schema({
    itemName: {
        type: Schema.Types.ObjectId, ref: 'ItemName',
        required: true
    },
    userName:
    {
        type: Schema.Types.ObjectId, ref: 'UserName',
        required: true
    },
    price:
    {
        type: Schema.Types.ObjectId, ref: 'ItemPrice',
        required: true
    },

})

export default model<ICart>('Item', cartSchema);
