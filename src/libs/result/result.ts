import { CustomError } from "../errors/custom.error";

export class Result<T = void> {
    constructor(
        private _isSuccess: boolean,
        private _value?: T | null,
        private _error?: CustomError
    ) { }



    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, value);
    }

    public static error<U>(error: CustomError): Result<U> {
        return new Result<U>(false, null, error);
    }

    public isSuccess(): boolean {
        return this._isSuccess;
    }

    public getError(): CustomError {
        if (!this._error) return new Error('not Errors')
        return this._error;
    }

    public getValue(): T | null {
        if (!this._value) throw new Error('not Value')
        return this._value;
    }
}