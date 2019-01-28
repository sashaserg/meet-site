import { User, Token } from "../models";
import bcrypt from "bcrypt";
const jwt = require ('jsonwebtoken');

const SECRET = 'SECRET_DAY';
const TOKEN_TYPE_ACCESS = 'access';
const TOKEN_TYPE_REFRESH = 'refresh';
const EXP_ACCESS = '30m';
const EXP_REFRESH = '60d';

const createToken = ( userId, userRole, tokenType, key, expiresIn ) => {
    return jwt.sign ({
        userId: userId,
        role: userRole,
        tokenType: tokenType // тип токена: access or refresh
        },
        key, // секретный ключ
        { expiresIn: expiresIn }); //
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    let authUser, accessToken, refreshToken;

    // Достаем пользователя по email
    User.findOne ({
        where: { email },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then (user => {
            if (!user) {
                throw({code: 400, message: "Email or password incorrect"});
            } else {
                authUser = user;

                return bcrypt.compare(password, user.password) //если есть, то проверяем пароль
            }
        })
        .then (result => { //если пароль совпал, то подсчитываем токены
            if (!result) {
                throw({ code: 400, message: "Email or password incorrect" });
            } else{
                return Token.count({ where: { userId: authUser.id } })
            }
        })
        .then( async (result) => {
            if(!result && result != 0) {
                throw({ code: 400, message: "Token count error" });
            } else if (result >= 3){
                //удалить с таблицы все токены
                const destroy = await Token.destroy({ where: { userId: authUser.id } })
                if(!destroy){
                    throw ({ code: 400, message: "Token delete error" });
                }
            }
            //сгенерить пару токенов
            accessToken = createToken(authUser.id, authUser.role,
                TOKEN_TYPE_ACCESS, SECRET, EXP_ACCESS);
            refreshToken = createToken(authUser.id, authUser.role,
                TOKEN_TYPE_REFRESH, SECRET, EXP_REFRESH);

            return Token.create({userId: authUser.id, token: refreshToken});
        })
        .then (result => { // если сохранение успешно, отправляем токены клиенту
            if (!result) {
                throw({ code: 400, message: "Email and password correct. DB INSERT error" });
            }
            else {
                delete authUser.dataValues.password;
                const response = { user: authUser, accessToken: accessToken, refreshToken: refreshToken };
                res.send(response);
            }
        })
        .catch (err => next (err));
};

module.exports.logout = (req, res, next) => {
    console.log(req.body);
    const { refreshToken } = req.body;
    Token.destroy({ where: { token: refreshToken } })
        .then(result => {
            console.log("logout result: ");
            console.log(result);
            if(!result)
                throw({ code: 400, message: "Refresh token incorrect" })
            else
                res.send({ code: 200, message: "Logout success" });
        })
        .catch(err => next(err));
};

// middleware для каждого запроса. принимаю accessToken, проверяю его и создаю новые
module.exports.checkAccess = async (req, res, next) => {
    const query = req.headers.authorization.split(' ')[1];
    let token;
    try {
        token = await jwt.verify(query, SECRET, (err, result) => {
            if(err){
                throw (err);
            }
            else if(result.tokenType !== 'access') {
                throw ({ message: 'incorrect token type'});
            }
            else {
                return result;
            }
        });

        req.userId = token.userId;
        req.role = token.role;
        next();
    } catch (err) {
        console.log('error in checkAccess');
        return next({code: 401, message: err.message});
    }

};

module.exports.refreshTokens = async (req, res, next) => {
    let query = req.body.refreshToken;
    let accessToken, refreshToken;
    let token;
    console.log('refresh tokens method');
    try {
        token = await jwt.verify(query, SECRET, (err, result) => {
            if(err)
                throw (err);
            else if(result.tokenType !== 'refresh')
                throw ({message: 'incorrect token type'});
            else
                return result;
        });
    } catch (err) {
        console.log('refresh token error on first step');
        return next({code: 400, message: err.message});
    }

    Token.count({ where: { userId: token.userId } })
        .then( async (result) => {
            if(!result) {
                throw({ code: 400, message: "Token count error" });
            } else if (result > 3){
                //удалить с таблицы все токены
                const destroy = await Token.destroy({ where: { userId: token.userId } })
                if(!destroy){
                    throw ({ code: 400, message: "Token delete error" });
                } else {
                    throw ({ code: 400, message: "Token limit error" })
                }
            } else {
                return Token.findOne({ where: { token: query } })
            }
        })
        .then(result => {
            if(!result) {
                throw ({ code: 400, message: "Can`t find token in DB" })
            } else {
                return User.findOne({ where: { id: token.userId } })
            }
        })
        .then(result => {
            if(!result) {
                throw ({ code: 400, message: "Can`t find user in DB" })
            } else {
                //сгенерить пару токенов
                accessToken = createToken(result.id, result.role, TOKEN_TYPE_ACCESS, SECRET, EXP_ACCESS);
                refreshToken = createToken(result.id, result.role, TOKEN_TYPE_REFRESH, SECRET, EXP_REFRESH);
                return Token.update({userId: result.id, token: refreshToken}, {where: {token: query}});
            }
        })
        .then(result => { // если сохранение успешно, отправляем токены клиенту
            if (!result) {
                throw({ code: 400, message: "Update token to DB failed" });
            }
            else {
                res.send({ accessToken: accessToken, refreshToken: refreshToken });
            }
        })
        .catch(err => {
            next(err);
        });
};


const log = (str) => {
    console.log(str);
};
