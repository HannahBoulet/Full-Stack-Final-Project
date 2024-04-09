import { Schema, Document, model, Types } from "mongoose"

export interface ICart extends Document {

    _id: Types.ObjectId,
    user: Types.ObjectId,
    item: Types.ObjectId,
    quantity: Number,
    _v: String
}

const cartSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: Number

})

export default model<ICart>('Cart', cartSchema);
