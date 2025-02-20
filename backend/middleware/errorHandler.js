
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message
    })
}

module.exports = {
    errorHandler
}