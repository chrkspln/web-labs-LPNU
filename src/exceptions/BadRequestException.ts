
export class BadRequestException extends Error {
    public message: string;
    public statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = 'BadRequestException';
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, BadRequestException.prototype);
    }
}
