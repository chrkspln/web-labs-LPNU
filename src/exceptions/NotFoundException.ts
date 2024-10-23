
export class NotFoundException extends Error {
    public message: string;
    public statusCode: number;

    constructor(message: string, statusCode: number = 404) {
        super(message);
        this.name = "NotFoundException";
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}