import mongoose, { Document, ObjectId , Schema, model} from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Interface - describing the model properties:
export interface IProductModel extends Document {
    // We do not define the _id
    name: string;
    price: number;
    stock: number;
    categoryId: ObjectId; // Foreign Key to categories.
}

//2 Schema - describing model rules: 
export const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name must be minimum 2 chars"],
        maxlength: [100, "Name can't be exceed 100 chars"],
        trim: true,
        unique: true
    },
    price : {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"],
    },
    stock : {
        type: Number,
        required: [true, "Missing stock"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
    }
},{ versionKey: false, // Don't add __v Property to new document. 
    toJSON: { virtuals: true }, // Return Virtual fields.
    id: false // Don't duplicate the _id into id property
});

ProductSchema.virtual("category", {
    ref: CategoryModel, // The model we're connecting to.
    localField: "categoryId", // In our model(product model) which is the related property
    foreignField: "_id", // In the other model (CategoryModel) which is the related property
    justOne: true // Category field is an object and not array.
});


// 3. Model: 
export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products"); // Model Name, model schema, collection name.