import createHttpError from 'http-errors';

export class UnauthorizedError extends createHttpError.Unauthorized {
    constructor() {
        super('Unauthorized. You must be signed in to access this resource.');
    }
}

export class InternalServerError extends createHttpError.InternalServerError {
    constructor() {
        super('Something went wrong. Please try again later.');
    }
}

export class BadRequestError extends createHttpError.BadRequest {
    constructor(message: string) {
        super(message);
    }
}


