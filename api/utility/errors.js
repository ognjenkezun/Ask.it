class BaseError extends Error {
    constructor(message) {
        super(message);
        this.toJSON = () => ({
            message: this.message,
            status: this.status,
        });
    }
}

class GenericError extends BaseError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class DuplicateKeyError extends BaseError {
    constructor(entity, err) {
        super(`Entity already exists - ${JSON.stringify(entity)}`);
        this.status = 400;
        this.originError = err;
    }
}

class NotNullViolationError extends BaseError {
    constructor(entity, err) {
        const detail = err && err.column ? err.column : JSON.stringify(entity);
        super(`Field cannot be null - ${detail}`);
        this.status = 400;
        this.originError = err;
    }
}

class InvalidDataTypeError extends BaseError {
    constructor(entity, err) {
        const baseMessage =
        parseOriginalPostgresError(err) || 'Invalid data type specified';
        super(`${baseMessage} - ${JSON.stringify(entity)}`);
        this.status = 400;
        this.originError = err;
    }
}