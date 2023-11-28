import { Document, Schema, model } from "mongoose";

// 1-Interface: 
export interface ICategoryModel extends Document {
    name: string;
    description: string;
}

// 2. Schema:
export const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name must be minimum 2 chars"],
        maxlength: [100, "Name can't be exceed 100 chars"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [10, "Name must be minimum 10 chars"],
        maxlength: [1000, "Name can't be exceed 1000 chars"],
        trim: true,
    },

}, { versionKey: false });

// 3. Model: 
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema,"categories");