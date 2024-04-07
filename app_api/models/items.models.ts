import { Schema, Document, model, Types } from "mongoose"

export interface IItem extends Document {
    _id: Types.ObjectId,
    itemName: String,
    image: String,
    description: String,
    price: Number,
    _v: String
}

const itemsSchema: Schema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },

})

export default model<IItem>('Item', itemsSchema);
