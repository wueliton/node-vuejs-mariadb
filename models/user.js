"use strict";

const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const Op = Sequelize.Op;

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              mg: "O nome deve ser informado",
            },
          },
        },
        description: DataTypes.STRING,
        pic: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              mg: "O E-mail deve ser informado",
            },
            isEmail: {
              msg: "Não é um E-mail válido",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              mg: "A senha deve ser informada",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "User",
        underscored: true,
      }
    );
  }
  static associations(models) {}
}

module.exports = User;
