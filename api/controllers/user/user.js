import userService from '../../services/user/user';
import util from '../../utility/util';

const userController = {};

userController.getAll = async (req, res) => {
    try {
        const allUsers = await userService.getAll();

        if (allUsers.length > 0) {
            return util.sendSuccess(res, 200, 'User retrieved', allUsers);
        }

        return util.sendSuccess(res, 200, 'No users found');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

userController.getById = async (req, res) => {
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const user = await userService.getById(id);

        if (!user) {
            return util.sendError(res, 400, `Cannot find user with the id ${id}`);
        }

        return util.sendSuccess(res, 200, 'User found', user);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

userController.createNew = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || 
        !req.body.email || !req.body.password) {
            
        return util.sendError(res, 400, 'Please provide complete details');
    }

    const newUser = req.body;

    try {
        const createdUser = await userService.createNew(newUser);
        
        return util.sendSuccess(res, 201, 'User added', createdUser);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

userController.update = async (req, res) => {
    const alteredUser = req.body;
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const updatedUser = await userService.update(id, alteredUser);

        if (!updatedUser) {
            return util.sendError(res, 400, `Cannot find user with the id ${id}`);
        }

        return util.sendSuccess(res, 200, 'User updated', updatedUser);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

userController.delete = async (req, res) => {
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const userToDelete = await userService.delete(id);

        if (userToDelete) {
            return util.sendSuccess(res, 200, 'User deleted');
        }
        
        return util.sendSuccess(res, 404, `User with the id ${id} cannot be found`);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

export default userController;