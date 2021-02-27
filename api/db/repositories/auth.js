const User = require('../../db/models').User;

const authRepository = {};

authRepository.register = async (registerData) => {
    return User.create(registerData);
}

authRepository.login = async (email) => {
    return User.findOne({
        where: { 
            email
        }
    });
}

export default authRepository;