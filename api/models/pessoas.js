'use strict';
const {
  Model, ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

        Pessoas.hasMany(models.Turmas, {foreignKey: 'docente_id'});
        Pessoas.hasMany(models.Matriculas, {foreignKey: 'estudante_id',
        scope: { status: 'confirmado'},
        as: 'AulasMatriculadas'  
      });
    }
  }
  Pessoas.init({

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        funcaoValidadora: function(dado){
          if(dado.length < 3) throw new Error('O campo nome deve ter mais de 3 caracteres.')
        }
      }
    },

    ativo: DataTypes.BOOLEAN,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          arg: true,
          msg: 'Campo e-mail deve ser preenchido com um dado do tipo e-mail.'},
      }
    },

    role: DataTypes.STRING
  },
    {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {ativo: true}
    },
    scopes: {
      todos: { where: {}}
    },
  },);
  return Pessoas;
};