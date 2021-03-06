import authService from '../../services/auth/auth';
import util from '../../utility/util';

const authController = {};

authController.register = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName ||
        !req.body.email || !req.body.password) {
        
        return util.sendError(res, 400, 'Please provide complete details');
    }

    const registerUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const token = await authService.register(registerUserData);

        if (token) {
            return util.sendSuccess(res, 201, 'User registered', token);
        }

        return util.sendError(res, 401, 'User is not registered');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

authController.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return util.sendError(res, 400, 'Please provide complete details');
    }

    const loginData = {
        password: req.body.password,
        email: req.body.email
    };

    try {
        const loginUser = await authService.login(loginData);

        if (loginUser) {
            return util.sendSuccess(res, 200, 'User logged', loginUser);
        }

        return util.sendError(res, 401, 'Pasword or email is not correct')
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

export default authController;