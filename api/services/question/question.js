import questionRepository from '../../db/repositories/question';

const questionService = {};

questionService.getAll = async (page) => {
    const limit = 20;
    const offset = 0 + (page - 1) * limit;

    return questionRepository.getAll(offset, limit);
}

questionService.getAllForLoggedUser = async (userId) => {
    return questionRepository.getAllForLoggedUser(userId);
}

questionService.getById = async (id) => {
    return questionRepository.getById(id);
}

questionService.getWithTheMostLikes = async () => {
    return questionRepository.getWithTheMostLikes();
}

questionService.getWithTheMostAnswers = async () => {
    return questionRepository.getWithTheMostAnswers();
}

questionService.createNew = async (newQuestion) => {
    return questionRepository.createNew(newQuestion);
}

questionService.update = async (id, updatedQuestion) => {
    return questionRepository.update(id, updatedQuestion);
}

questionService.delete = async (id) => {
    return questionRepository.delete(id);
}

export default questionService;