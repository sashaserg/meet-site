const yup = require('yup');

const schema_createUser = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    /*age: yup
        .number("Age must be number")
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be integer")
        .lessThan(100, "Age must be less than 100"),*/
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .min(8)
        .max(24),
    profilePicture: yup
        .string()
        .url()
        .default('http://localhost:3000/public/img/1547898703148-all_def_pic.png'),
    gender: yup
        .string()
        .required(),
    purpose: yup
        .string(),
    status: yup
        .number()
        .default(1),
    birthDate: yup
        .date()
        .required()
});
const schema_updateUser = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup
        .string()
        .email(),
    password: yup
        .string()
        .min(8)
        .max(24),
    profilePicture: yup
        .string()
        .url(),
    gender: yup
        .string(),
    purpose: yup
        .string(),
    status: yup
        .number(),
    birthDate: yup
        .date()
});

module.exports.createUser = (req, res, next) => {
    const user = req.body;
    schema_createUser.validate(user)
        .then((valid) => {
            console.log(valid);
            next();
        }).catch((error) => {
        next({code: 400, message: error.message})
    });
};

module.exports.updateUser = (req, res, next) => {
    const user = req.body;
    schema_updateUser.validate(user)
        .then((valid) => {
            console.log(valid);
            next();
        }).catch((error) => {
        next({code: 400, message: error.message})
    });
};
