import {Request, Response, NextFunction} from "express"

function freeCoffee(request: Request, response: Response, next: NextFunction): void {
    const price = +request.body.price;
    if(price === 0) {
        console.log("Weeeeee-Free Coffee");
    }
    next();
}

export default freeCoffee;