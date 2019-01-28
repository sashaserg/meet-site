'use strict';

module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    Photo.associate = function (models) {
        Photo.belongsTo(
            models.User,
            { foreignKey: 'userId', targetKey: 'id'},
            { onDelete: "CASCADE" }
        );
    };

    return Photo;
};
