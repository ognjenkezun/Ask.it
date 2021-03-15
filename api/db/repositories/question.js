const Question = require('../../db/models').Question;
const Answer = require('../../db/models').Answer;
const User = require('../../db/models').User;
const sequelize = require('sequelize');

const questionRepository = {};

questionRepository.getAll = async (offset, limit) => {
    return Question.findAll({
        offset: offset,
        limit: limit,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: User, 
            attributes: [
                'firstName', 'lastName'
            ]
        }, {
            model: Answer,
            include: [{
                model: User,
                attributes: [
                    'firstName', 'lastName'
                ]
            }]
        }]
    });
}

questionRepository.getAllForLoggedUser = async (userId) => {
    return Question.findAll({
        where: { 
            userId
        },
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: User, 
            attributes: [
                'firstName', 'lastName'
            ]
        }, {
            model: Answer,
            include: [{
                model: User,
                attributes: [
                    'firstName', 'lastName'
                ]
            }]
        }]
    });
}

questionRepository.getById = async (id) => {
    return Question.findOne({
        where: { 
            id
        },
        include: [{ 
            model: Answer, 
            order: [
                ['createdAt', 'ASC']
            ],
            include: [{
                model: User, 
                attributes: [
                    'firstName', 'lastName'
                ]
            }]
        }, {
            model: User, 
            attributes: [
                'firstName', 'lastName'
            ]
        }]
    });
}

questionRepository.getWithTheMostLikes = async () => {
    return Question.findAll({ 
        include: [{
            model: User, 
            attributes: [
                'firstName', 'lastName'
            ]
        }],
        order: [
            ['like', 'DESC']
        ]
    });
}

questionRepository.getWithTheMostAnswers = async () => {
    return Question.findAll({
        attributes: {
            include: [[sequelize.fn('COUNT', sequelize.col('Answers')), 'number_of_answers']]
        },
        include: [{
            model: User, 
            attributes: [
                'firstName', 'lastName'
            ]
        }, {
            model: Answer, attributes: []
        }],
        group: ['Question.id', 'User.id'],
        order: sequelize.literal('number_of_answers DESC')
    }
    );
}

questionRepository.createNew = async (newQuestion) => {
    return Question.create(newQuestion);
}

questionRepository.update = async (id, updatedQuestion) => {
    const questionForUpdate = await Question.findOne({ 
        where: { 
            id
        } 
    });

    if (questionForUpdate) {
        await Question.update(
            updatedQuestion, { 
                where: { 
                    id
                }
            }
        );

        return updatedQuestion;
    }

    return null;
}

questionRepository.delete = async (id) => {
    const questionToDelete = await Question.findOne({ 
        where: { 
            id
        } 
    });

    if (questionToDelete) {
        const deletedQuestion = await Question.destroy({
            where: { 
                id
            }
        });

        return deletedQuestion;
    }
    
    return null;
}

export default questionRepository;