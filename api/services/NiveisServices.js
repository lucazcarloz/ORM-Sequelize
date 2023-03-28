const Services = require('./Services');
const database = require('../models');

class NiveisServices extends Services{

    constructor(){
        
        super('Niveis')
    }

    //adicionar funções específicas. No momento não há o que ser feito

}

module.exports = NiveisServices;