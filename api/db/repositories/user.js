const User = require('../../db/models').User;

const userRepository = {};

userRepository.getAll = async () => {
    return User.findAll();
}

userRepository.getById = async (id) => {
    return User.findOne({
        where: {
            id
        }
    });
}

userRepository.createNew = async (newUser) => {
    return User.create(newUser);
}

userRepository.update = async (id, updatedUser) => {
    const userForUpdate = await User.findOne({
        where: {
            id
        }
    });

    if (userForUpdate) {
        await User.update(
            updatedUser, {
                where: { 
                    id 
                }
            }
        );

        return updatedUser;
    }

    return null;
}

userRepository.delete = async (id) => {
    const userToDelete = await User.findOne({
        where: {
            id
        }
    });

    if (userToDelete) {
        const deletedUser = await User.destroy({
            where: {
                id
            }
        });

        return deletedUser;
    }

    return null;
}

export default userRepository;