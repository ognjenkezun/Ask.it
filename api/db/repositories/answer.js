const Answer = require('../../db/models').Answer;

const answerRepository = {};

answerRepository.getAllToQuestionById = async (questionId) => {
    return Answer.findAll({
        where: {
            answerTo: questionId
        },
        order: [
            ['createdAt', 'DESC']
        ]});
}

answerRepository.getById = async (id) => {
    return Answer.findOne({
        where: {
            id
        }
    });
}

answerRepository.createNew = async (newAnswer) => {
    return Answer.create(newAnswer);
}

answerRepository.update = async (id, updatedAnswer) => {
    const answerForUpdate = await Answer.findOne({
        where: {
            id
        }
    });

    if (answerForUpdate) {
        await Answer.update(
            updatedAnswer, {
                where: {
                    id
                }
            }
        );

        return updatedAnswer;
    }

    return null;
}

answerRepository.delete = async (id) => {
    const answerForDelete = await Answer.findOne({
        where: {
            id
        }
    });

    if (answerForDelete) {
        const deletedAnswer = await Answer.destroy({
            where: {
                id
            }
        });

        return deletedAnswer;
    }

    return null;
}



export default answerRepository;