import Joi from "joi";

const SignUpValidation = (req, res, next) => {
    // Remove confirmPassword before validation
    const { confirmPassword, ...userData } = req.body;

    const Schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required()
    });

    const { error } = Schema.validate(userData);
    
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};


const LoginValidation = (req, res, next) => {
    const Schema = Joi.object(
        {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(50).required()
        }
    )
    const { error } = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({ messgae: "Bad request", error })
    }
    next();
}

export { SignUpValidation, LoginValidation };