import userRepository from '../../db/repositories/user';
import crypt from '../../helpers/crypto';

const userService = {};

userService.getAll = async () => {
    return userRepository.getAll();
}

userService.getById = async (id) => {
    return userRepository.getById(id);
}

userService.createNew = async (newUser) => {
    const salt = crypt.genRandomString(16);
    const passwordData = crypt.sha512(newUser.password, salt);

    newUser.salt = passwordData.salt;
    newUser.password = passwordData.passwordHash;

    return userRepository.createNew(newUser);
}

userService.update = async (id, updatedUser) => {
    return userRepository.update(id, updatedUser);
}

userService.delete = async (id) => {
    return userRepository.delete(id);
}

export default userService;