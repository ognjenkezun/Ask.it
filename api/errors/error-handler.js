const error = {};

error.errorHandler = (err, req, res, next) => {
    console.error(err)
    res.status(error.status || 500).send({
        status: error.status || 500,
        message: error.message || 'Internal Server Error', 
        type: error.type  || 'Internal Server Error',
        stack: error.stack,
    })
}

export default error;