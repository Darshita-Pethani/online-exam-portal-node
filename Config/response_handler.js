class ResponseHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    sender(code, message, data, error) {
        this.res.status(code).json({
            message: message,
            data
        })
        if (error) {
            // HANDLE LOGS AND OTHER STUFF
            console.log("ResponseHandler -> sender -> error", error)
        }
    }

    // 2XX SUCCESS
    success(data, message, info) {
        this.sender(
            STATUS_CODES.SUCCESS,
            message || 'Request has been completed successfully.',
            data, info
        )
    }

    created(data, message, info) {
        this.sender(
            STATUS_CODES.CREATED,
            message || 'Request has been created successfully.',
            data, info
        )
    }

    // 4XX CLIENT ERROR
    badRequest(data, message, info) {
        this.sender(
            STATUS_CODES.BAD_REQUEST,
            message || 'Request line contained invalid characters.',
            data, info
        )
    }

    unauthorized(data, message, info) {
        this.sender(
            STATUS_CODES.UNAUTHORIZED,
            message || 'You are not authorized to access.',
            data, info
        )
    }

    forbidden(data, message, info) {
        this.sender(
            STATUS_CODES.FORBIDDEN,
            message || 'You are not authorized to access.',
            data, info
        )
    }

    notFound(data, message, info) {
        this.sender(
            STATUS_CODES.NOT_FOUND,
            message || 'Resource associated with the request could not be found.',
            data, info
        )
    }

    notAllowed(message, info) {
        this.sender(
            STATUS_CODES.NOT_ALLOWED,
            message || 'This operation is not allowed.',
            undefined, info
        )
    }

    conflict(data, message, info) {
        this.sender(
            STATUS_CODES.CONFLICT,
            message || 'Provided information already exist!',
            data, info
        )
    }

    preconditionFailed(data, message, info) {
        this.sender(
            STATUS_CODES.PRECONDITION_FAILED,
            message || 'Please complete other steps first',
            data, info
        )
    }

    validationError(data, message, info) {
        this.sender(
            STATUS_CODES.VALIDATION_ERROR,
            message || 'Validation error !',
            data, info
        )
    }

    // 5XX SERVER ERROR
    serverError(error, data, message) {
        if (error && error.name === "ValidationError")
            return this.validationError(error)

        this.sender(
            STATUS_CODES.SERVER_ERROR,
            message || 'Request failed due to an internal error.',
            data, error
        )
    }
}

module.exports = ResponseHandler;