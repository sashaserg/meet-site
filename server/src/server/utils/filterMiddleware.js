import {User} from "../models";

const sequelize = require('sequelize');
const moment = require('moment');
const defPicUrl = 'http://localhost:3000/public/img/1547898703148-all_def_pic.png';

module.exports = (req, res, next) => {
    console.log(1);
    const query = req.query;
    const filter = [];

    if (query.firstName) {
        filter.push({firstName: {[sequelize.Op.iLike]: `%${query.firstName}%`}});
    }
    if (query.lastName) {
        filter.push({lastName: {[sequelize.Op.iLike]: `%${query.lastName}%`}});
    }
    if (query.gender) {
        filter.push({gender: query.gender});
    }
    if (query.withPhoto == 'true') {
       // filter.push({profilePicture: {[sequelize.Op.not]: null}});
        filter.push({
            profilePicture: {
                [sequelize.Op.and]: {
                    [sequelize.Op.not]: null, [sequelize.Op.not]: defPicUrl
                }
            }
        });
    }
    if (query.purpose) {
        filter.push({purpose: query.purpose});
    }
    if (query.maxAge)
    {
        filter.push({birthDate: {[sequelize.Op.gte]: moment().subtract(query.maxAge, 'year').format('YYYY-MM-DD')}});
    }
    if (query.minAge)
    {
        filter.push({birthDate: {[sequelize.Op.lte]: moment().subtract(query.minAge, 'year').format('YYYY-MM-DD')}});
    }
    if (query.isActive == true)
    {
        filter.push({isActive: true});
    }
    req.filter = filter;
    next();
}
