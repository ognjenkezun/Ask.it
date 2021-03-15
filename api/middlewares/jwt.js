import jwtToken from 'jsonwebtoken';

const jwt = {};
const secret = process.env.SECRET;

jwt.sign = (data) => {
    return jwtToken.sign(data, secret);
}

jwt.authenticate = (req, res, next) => {
    const token = req.headers.jwt;
    if(!token) {
        res.status(401).json({ statusCode: 401, message: "Unauthorized" });
        next(false);
    }

    const isValid = jwtToken.verify(token, secret);

    if(isValid) {
        const user = jwtToken.decode(token);
        req.user = user;
        next();
    }
    else {
        res.status(401).json({ statusCode: 401, message: "Unauthorized" });
        next(false);
    }
}

export default jwt;