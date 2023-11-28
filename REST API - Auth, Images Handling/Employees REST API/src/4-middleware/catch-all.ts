import { Request,Response,NextFunction } from "express";
import StatusCode from "../3-models/status-code";

function catchAll(err: any, request: Request, response: Response, next: NextFunction): void{
    
    console.log("Error: " , err );

    const status = err.status || StatusCode.InternalServerError;

    const message = err.message;

    response.status(status).send(message);
}

export default catchAll;