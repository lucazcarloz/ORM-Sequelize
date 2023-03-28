// const database = require ('../models');
// const Sequelize = require('sequelize');
const TurmasServices = require('../services/Services');
const turmasServices = new TurmasServices();
const Op = Sequelize.Op;

class TurmaController {

  static async pegaTodasAsTurmas(req, res){

    const {data_inicial, data_final} = req.query;

      try{

          const todasAsTurmas = await turmasServices.pegaTodasAsTurmas({ where });
          return res.status(200).json(todasAsTurmas);
      } catch (error){

          return res.status(500).json(error.message);
      }
  }

  static async pegaUmaTurma(req, res){

      const { id } = req.params;

      try{

          const umaTurma = await turmasServices.pegaUmRegistro(id);
          return res.status(200).json(umaTurma);
      }catch (error){
          
          return res.status(500).json(error.message);
      }
  }

  static async criaTurma(req, res){

      const novaTurma = req.body;

      try{

          const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma);
          res.status(200).json(novaTurmaCriada);
      }catch(error){

          return res.status(500).json(error.message);
      }
  }

  static async atualizaTurma(req,res){

      const novasInfos = req.body;
      const { id } = req.params;

      try{
          
          await turmasServices.atualizaRegistro(novasInfos, id);
          const turmaAtualizada = await turmasServices.pegaUmRegistro(id);
          return res.status(200).json(turmaAtualizada);
      }catch(error){

          return res.status(500).json(error.message);
      }
  }
  
  static async apagaTurma(req, res){
      const { id } = req.params;
      
      try{

          await turmasServices.apagaRegistro(id);
          return res.status(200).json({mensagem: `id ${id} deletado`})
      }catch(error){

          return res.status(500).json(error.message);
      }
  }

  static async restauraTurma(req, res){

    const { id } = req.params;

    try{

        await turmasServices.restauraRegistro(id)
        return res.status(200).json({mensagem: `id ${id} restaurado!`})
    } catch (error){

       return res.status(500).json(error.message);
    }
}
}


module.exports = TurmaController;