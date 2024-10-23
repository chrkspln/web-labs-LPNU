import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware(type: any): (request: Request, response: Response, next: NextFunction) => void {
    return (
        request: Request,
        response: Response,
        next: NextFunction
    ): void => {
        const dtoObject = plainToClass(type, request.body);

        validate(dtoObject).then((errors) => {
            if (errors.length > 0) {
                return response.status(400).json({
                    message: 'Validation failed',
                    errors: errors.map(err => ({
                        property: err.property,
                        constraints: err.constraints
                    })),
                });
            } else {
                next();
            }
        });
    };
};
