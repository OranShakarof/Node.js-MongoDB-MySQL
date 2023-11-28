import StatusCode from "./status-code";

abstract class ClientError {
    constructor(public status: number, public message: string) {}
}

export class ValidationError extends ClientError {
    constructor(message: string){
        super(StatusCode.BadRequest, message);
    }
}

export class RouteNotFoundError extends ClientError{
    constructor(route: string){
        super(StatusCode.NotFound, `Route ${route} not found.`);
    }
}

export class ResourceNotFoundError extends ClientError{
    constructor(id: number){
        super(StatusCode.NotFound, `Id ${id} not exits.`);
    }
}