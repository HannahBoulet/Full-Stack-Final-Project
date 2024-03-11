import { Schema, Document, model } from "mongoose"

export interface IItem extends Document {

    itemName: String,
    description: String,
    price: Number
}

const itemsSchema: Schema = new Schema({
    itemName: {
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
