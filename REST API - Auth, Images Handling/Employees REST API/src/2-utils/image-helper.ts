import { UploadedFile } from "express-fileupload";
import path from "path";
import {v4 as uuid} from "uuid";
import fsPromises from "fs/promises";


// Save image to disk in uuid name:
async function saveImage(image: UploadedFile): Promise<string> {
    // Take original file extension: 
    const extension = image.name.substring(image.name.lastIndexOf("."));

    // Create unique file name:
    const fileName = uuid() + extension;
    
    // Get absolute path to save image:
    const absolutePath = path.join(__dirname, ".." , "1-assets", "images", fileName);

    // Save image: 
    await image.mv(absolutePath);

    // Return unique name: 
    return fileName;
}

export default {
    saveImage,
}