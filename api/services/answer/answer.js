import repositoryAnswer from '../../db/repositories/answer';

const answerService = {};

answerService.getAllToQuestionById = async (questionId) => {
    return repositoryAnswer.getAllToQuestionById(questionId);
}

answerService.getById = async (id) => {
    return repositoryAnswer.getById(id);
}

answerService.createNew = async (newAnswer) => {
    return repositoryAnswer.createNew(newAnswer);
}

answerService.update = async (id, updatedAnswer) => {
    return repositoryAnswer.update(id, updatedAnswer);
}

answerService.delete = async (id) => {
    repositoryAnswer.delete(id);
}

export default answerService;