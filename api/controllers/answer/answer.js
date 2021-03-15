import answerService from '../../services/answer/answer';
import util from '../../utility/util';

const answerController = {};

answerController.getAllToQuestionById = async (req, res) => {
    const questionId = req.params.id;

    if (!Number(questionId) && Number(questionId) !== 0) {
        return util.sendError(res, 400, 'Question Id is not numeric value');
    } else if (Number(questionId) === 0) {
        return util.sendError(res, 400, 'Question Id must be greater than 0');
    }

    try {
        const allAnswersToQuestionById = await answerService.getAllToQuestionById(questionId);

        if (allAnswersToQuestionById.length > 0) {
            return util.sendSuccess(res, 200, 'Answers to question retrieved', allAnswersToQuestionById);
        }
            
        return util.sendSuccess(res, 200, 'No questions found');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

answerController.getById = async (req, res) => {
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const answer = await answerService.getById(id);
        
        if (!answer) {
            return util.sendError(res, 404, `Cannot find answer with the id ${id}`);
        }
        
        return util.sendSuccess(res, 200, 'Found answer', answer);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

answerController.createNew = async (req, res) => {
    if (!req.body.answerTo || !req.body.content || !req.user.id) {
        return util.sendError(res, 400, 'Please provide complete details');
    }

    const newAnswer = {
        content: req.body.content,
        like: 0,
        dislike: 0,
        answerUserId: req.user.id,
        answerTo: req.body.answerTo
    }

    try {
        const createdAnswer = await answerService.createNew(newAnswer);

        return util.sendSuccess(res, 201, 'Answer added', createdAnswer);
    } catch (error) {
        return util.sendError(res, 400, error); 
    }
}

answerController.update = async (req, res) => {
    const { id } = req.params;

    alteredAnswer = {
        content: req.body.content,
        like: req.body.like,
        dislike: req.body.dislike,
        createdBy: req.body.createdBy,
        answerTo: req.body.answerTo
    }

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const updatedAnswer = await answerService.update(id, alteredAnswer);

        if (!updatedAnswer) {
            return util.sendError(res, 400, `Canot find answer with the id ${id}`);
        }
        
        return util.sendSuccess(res, 200, 'Answer updated', updatedAnswer);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

answerController.delete = async (req, res) => {
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const answerDelete = await answerService.delete(id);

        if (answerDelete) {
            return util.sendSuccess(res, 200, 'Answer deleted');
        }
            
        return util.sendError(res, 404, `Answer with the id ${id} cannot be found`);
    } catch (error) {
        return util.sendError(res, 400, error); 
    }
}

export default answerController;