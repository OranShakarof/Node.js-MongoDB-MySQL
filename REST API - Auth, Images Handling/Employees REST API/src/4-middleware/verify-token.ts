import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// Verify token validity:
function verifyToken(request: Request, response: Response, next: NextFunction): void{

    // Authorization: "Bearer the-token":
    const authorizationHeader = request.header("authorization");

    // Extract token: 
    const token = authorizationHeader?.substring(7);

    cyber.verifyToken(token);
    next();

}

export default verifyToken;