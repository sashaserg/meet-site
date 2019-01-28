'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["man", "woman"],
      allowNull: false,

    },
    purpose: {
      type: DataTypes.ENUM,
      values: ["friendship", "conversation", "relationship", "sex"],
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "inactive"],
      allowNull: false,
      defaultValue: "active" // def status 1 is active user
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "super-user", "admin"],
      allowNull: false,
      defaultValue: "user"
    }

  });
  return User;
};
