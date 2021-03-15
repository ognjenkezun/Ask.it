import crypt from '../../helpers/crypto';
import jwt from '../../middlewares/jwt';
import authRepository from '../../db/repositories/auth';

const authService = {};

authService.register = async (registerData) => {
    const salt = crypt.genRandomString(16);
    const passwordData = crypt.sha512(registerData.password, salt);

    registerData.salt = passwordData.salt;
    registerData.password = passwordData.passwordHash;

    const registeredUser = await authRepository.register(registerData);

    if (registeredUser) {
        return jwt.sign({ id: registeredUser.id, email: registeredUser.email });
    }

    return null;
}

authService.login = async (loginData) => {
    const loginUser = await authRepository.login(loginData.email);

    if (loginUser) {
        const passwordData = crypt.sha512(loginData.password, loginUser.salt);

        if(loginUser.password === passwordData.passwordHash) {
            const token = jwt.sign({ id: loginUser.id, email: loginUser.email });
            const user = {
                id: loginUser.id,
                firstName: loginUser.firstName,
                lastName: loginUser.lastName,
                email: loginUser.email
            }

            return { token, user };
        }
    }

    return null;
}

export default authService;