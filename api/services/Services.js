const database = require('../models');

class Services {

    constructor(nomeDoModelo){

        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros() {

        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id){

        return database[this.nomeDoModelo]
        .scope('todos')
        .findOne({where: {id: Number(id)}});
    }

    async criaRegistro(dados){

        return database[this.nomeDoModelo].create(dados);
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}){

        return database[this.nomeDoModelo]
            .scope('todos')
            .update(dadosAtualizados, { where: { id: id }}, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}){

        return database[this.nomeDoModelo]
            .scope('todos')
            .update(dadosAtualizados, { where: { ...where }}, transacao)
    }

    async apagaRegistro(id){

        return database[this.nomeDoModelo]
        .scope('todos')
        .destroy({where: {id:id}})
    }

    async restauraRegistro(id){

        return database[this.nomeDoModelo]
        .scope('todos')
        .restore({where: {id: Number(id)}})
    }
}

module.exports = Services;