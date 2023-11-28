import {Request, Response, NextFunction} from "express"

function showId(request: Request, response: Response, next: NextFunction): void {
    const id = +request.params.id;

    console.log("User Want to update id: " + id);
    next();
}

export default showId;