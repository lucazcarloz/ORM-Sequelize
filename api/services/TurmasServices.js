const Services = require('./Services');
const database = require('../models');


class TurmasServices extends Services{

    constructor(){
        
        super('turmas')
    }

    async pegaTodasAsTurmas(data_inicial, data_final){

        const where = {};
        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;

        return database[this.nomeDoModelo].findAll({ where });
    }

}

module.exports = TurmasServices;