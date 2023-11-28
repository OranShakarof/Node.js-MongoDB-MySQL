import { Request,Response,NextFunction } from "express";
import StatusCode from "../3-models/status-code";
import { RouteNotFoundError } from "../3-models/error-model";

function routeNotFound(request: Request, response: Response, next: NextFunction): void{
    next(new RouteNotFoundError(request.originalUrl));
}

export default routeNotFound;