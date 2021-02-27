const util = {};

util.sendSuccess = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ statusCode, message, data });
}

util.sendError = (res, statusCode, message) => {
    console.log(`Error: ${statusCode} => ${message}`);
    return res.status(statusCode).json({ statusCode, message });
}

export default util;