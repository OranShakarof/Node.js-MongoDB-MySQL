import {Request, Response, NextFunction} from "express"
import fsPromises from "fs/promises";


async function verbose(request: Request, response: Response, next: NextFunction) {
    const content = [];
    const time = new Date().toLocaleString();
    content.push(time)
    content.push(request.method);
    content.push(request.originalUrl);
    content.push(request.ip);

    try{
        await fsPromises.writeFile("./activities.txt", JSON.stringify(content));
        next();
    }
    catch(err: any){
        console.log(err);
    }
}

export default verbose;