import HttpStatus from 'http-status-codes'

export class CustomError {
    constructor(
        public message: string,
        public code?: number,
    ) { }
}

export class NotFoundError extends CustomError {
    constructor(field: string) {
        super(
            `${field} not found`,
            HttpStatus.NOT_FOUND
        )
    }
}