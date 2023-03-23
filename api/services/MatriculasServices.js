const Services = require('./Services');
const database = require('../models');
const Sequelize = require('sequelize');

class MatriculasServices extends Services{

    constructor(){
        
        super('Matriculas')
    }

    async buscaUmaMatricula(estudanteId, matriculaId){

        return database.Matriculas.findOne({
                
            where: {
                id: Number(matriculaId),
                estudante_Id: Number(estudanteId)
        }});
    }

    async buscaTodasAsMatriculas(estudanteId){

        return database.Matriculas.findAll({

            where: {
                estudante_Id: Number(estudanteId)
            }})
    }

    async criaMatricula(dados){

        return database.Matriculas.create(dados);
    }

    async atualizaMatricula(dados, estudanteId, matriculaId){

        database.Matriculas.update(dados, {

            where: {
                id:             Number(matriculaId),
                estudante_id:   Number(estudanteId)
            }});
    }

    async apagaMatricula(id){

        return database[this.nomeDoModelo].destroy({where: {id:id}});
    }

    async restauraMatricula(id){

        return database[this.nomeDoModelo]
        .restore({where: {id: Number(id)}});
    }

    async buscaMatriculaPorTurma(turmaId){

        return database.Matriculas
            .findAndCountAll({
                where:{
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
            //order: [['estudante_id', 'DESC']]
            //limit: 20,
        });
    }

    async buscaTurmasLotadas(lotacaoTurma){

        return database.Matriculas.findAndCountAll({

            where:{
                status: 'confirmado'
            },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        });
    }
}

module.exports = MatriculasServices;