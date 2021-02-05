const User = require("../../models").User;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class UsersController {
  async index(req, res, next) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 20;
      const offset = req.query.offset ? parseInt(req.query.offset) : 0;
      let where = {};
      if (req.query.name) {
        where.name = {
          [Op.like]: `%${req.query.name}%`,
        };
      }
      if (req.query.email) where.email = q.query.email;

      const entities = await User.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset,
      });

      return res.status(200).json({
        status: "Success",
        data: entities,
        meta: {
          limit: limit,
          offset: offset,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: "Error",
        message: `Não foi possível listar entidades de Usuáros`,
      });
    }
  }

  async show(req, res, next) {
    try {
      const entity = await User.findByPk(req.params.id);

      if (!entity) {
        return res.status(404).json({
          status: "Error",
          message: `Usuário não localizado`,
        });
      }

      return res.status(200).json({
        status: "Success",
        data: entity,
      });
    } catch (e) {
      return res.status(500).json({
        status: "Error",
        message: `Não foi possível recuperar os dados da entidade Usuário pelo ID`,
      });
    }
  }

  async store(req, res, next) {
    try {
      const existsEntity = await User.findOne({
        where: { email: req.body.email },
      });
      if (existsEntity) {
        return res.status(404).json({
          status: "Error",
          message: `Já existe um cadastro com o E-mail informado`,
        });
      }

      const entity = await User.create(req.body);
      return res.status(200).json({
        status: "Success",
        message: `Usuário adicionado`,
        data: entity,
      });
    } catch (e) {
      if (e.name && e.name.includes("SequelizeValidation")) {
        return res.status(404).json({
          status: "Error",
          message: `Dados Inválidos`,
          error: e.errors.map((err) => {
            return {
              message: err.message,
              field: err.path,
              value: err.value,
            };
          }),
        });
      }

      return res.status(500).json({
        status: "Error",
        message: `Erro ao cadastrar novo Usuário`,
      });
    }
  }

  async update(req, res, next) {
    try {
      const entityOld = await User.findByPk(req.params.id);
      const entityNew = await entityOld.update(req.body);
      return res.status(200).json({
        status: "Success",
        message: `Dados Atualizados`,
        data: entityNew,
      });
    } catch (e) {
      if (e.name && e.name.includes("SequelizeValidation")) {
        return res.status(404).json({
          status: "Error",
          message: `Dados Inválidos`,
          error: e.errors.map((err) => {
            return {
              message: err.message,
              field: err.path,
              value: err.value,
            };
          }),
        });
      }

      return res.status(500).json({
        status: "Error",
        message: `Erro atualizar Usuário`,
      });
    }
  }

  async delete(req, res, next) {
    try {
      const entity = await User.findByPk(req.params.id);

      if (!entity) {
        return res.status(404).json({
          status: "Error",
          message: `Não foi possível recuperar os dados da entidade Usuário pelo ID`,
        });
      }

      entity.destroy();

      return res.status(204).json({
        status: "Success",
        message: `Usuário excluído`,
      });
    } catch (e) {
      return res.status(500).json({
        status: "Error",
        message: `Não foi possível recuperar os dados da entidade Usuário pelo ID`,
      });
    }
  }
}

module.exports = new UsersController();
