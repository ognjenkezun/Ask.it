import questionService from '../../services/question/question';
import util from '../../utility/util';

const questionController = {};

questionController.getAll = async (req, res) => {
    const { page } = req.query;

    if (!Number(page) && Number(page) !== 0) {
        return util.sendError(res, 400, 'Page is not numeric value');
    } else if (Number(page) === 0) {
        return util.sendError(res, 400, 'Page must be greater than 0');
    }

    try {
        const allQuestions = await questionService.getAll(page);
        
        if (allQuestions.length > 0) {
            return util.sendSuccess(res, 200, 'Questions retrieved', allQuestions);
        }
        
        return util.sendSuccess(res, 200, 'No questions found');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.getById = async (req, res) => {
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const question = await questionService.getById(id);

        if (!question) {
            return util.sendError(res, 404, `Cannot find question with the id ${id}`);
        }
        
        return util.sendSuccess(res, 200, 'Question found', question);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.getAllForLoggedUser = async (req, res) => {
    const { id } = req.user;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const allQuestionByUser = await questionService.getAllForLoggedUser(id);

        if (allQuestionByUser.length > 0) {
            return util.sendSuccess(res, 200, 'Questions retrieved', allQuestionByUser);
        }

        return util.sendSuccess(res, 200, 'No questions found');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.getWithTheMostAnswers = async (req, res) => {
    try {
        const questionsWithTheMostAnswers = await questionService.getWithTheMostAnswers();

        if (questionsWithTheMostAnswers.length > 0) {
            return util.sendSuccess(res, 200, 'Questions retrieved', questionsWithTheMostAnswers);
        }

        return util.sendSuccess(res, 200, 'No questions found');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.getWithTheMostLikes = async (req, res) => {
    try {
        const questionsWithTheMostLikes = await questionService.getWithTheMostLikes();

        if (questionsWithTheMostLikes.length > 0) {
            return util.sendSuccess(res, 200, 'Questions retrieved', questionsWithTheMostLikes);
        }
            
        return util.sendSuccess(res, 200, 'No questions found');
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.createNew = async (req, res) => {
    if (!req.body.content || !req.body.like || !req.body.dislike || !req.user.id) {
        return util.sendError(res, 400, 'Please provide complete details');
    }

    const newQuestion = {
        content: req.body.content,
        like: req.body.like,
        dislike: req.body.dislike,
        userId: req.user.id,
    };

    try {
        const createdQuestion = await questionService.createNew(newQuestion);

        return util.sendSuccess(res, 201, 'Question added', createdQuestion);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.update = async (req, res) => {
    const alteredQuestion = req.body;
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const updatedQuestion = await questionService.update(id, alteredQuestion);

        if (!updatedQuestion) {
            return util.sendError(res, 400, `Cannot find question with the id ${id}`);
        }
        
        return util.sendSuccess(res, 200, 'Question updated', updatedQuestion);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

questionController.delete = async (req, res) => {
    const { id } = req.params;

    if (!Number(id) && Number(id) !== 0) {
        return util.sendError(res, 400, 'Id is not numeric value');
    } else if (Number(id) === 0) {
        return util.sendError(res, 400, 'Id must be greater than 0');
    }

    try {
        const questionToDelete = await questionService.delete(id);

        if (questionToDelete) {
            return util.sendSuccess(res, 200, 'Question deleted');
        }
        
        return util.sendError(res, 404, `Question with the id ${id} cannot be found`);
    } catch (error) {
        return util.sendError(res, 400, error);
    }
}

export default questionController;