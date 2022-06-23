import Joi from 'joi';

const personSchema = Joi.object({
    name: Joi.string().min(2).trim().max(20).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'The name must be at least 2 characters.'
    }),

    phoneNumbers: Joi.string()
        .optional()
        .allow('')
        .min(13)
        .trim()
        .max(13)
        .regex(new RegExp('^[+]?380([0-9]{9})$'))
        .messages({
            'string.pattern.base': 'Number should start with code of Ukraine +380',
            'string.max': 'Length must be less than or equal to 13 characters long',
            'string.min': 'Length must be at least 13 characters long'
        })
});

export { personSchema };
