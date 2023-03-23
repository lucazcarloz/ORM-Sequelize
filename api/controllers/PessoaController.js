// const database = require ('../models');
// const Sequelize = require('sequelize');
const { PessoasServices, MatriculasServices } = require('../services');
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController {

    static async pegaPessoasAtivas(req, res){

        try{

            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error){

            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res){

        try{

            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch (error){

            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res){

        const { id } = req.params;

        try{

            const umaPessoa = await pessoasServices.pegaUmRegistro(id);
            return res.status(200).json(umaPessoa);
        }catch (error){
            
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res){

        const novaPessoa = req.body;

        try{

            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
            res.status(200).json(novaPessoaCriada);
        }catch(error){

            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req,res){

        const novasInfos = req.body;
        const { id } = req.params;

        try{
            
            await pessoasServices.atualizaRegistro(novasInfos, id);
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id);
            return res.status(200).json(pessoaAtualizada);
        }catch(error){

            return res.status(500).json(error.message);
        }
    }
    
    static async apagaPessoa(req, res){
      
        const { id } = req.params;
        
        try{

            await pessoasServices.apagaRegistro(id);
            return res.status(200).json({mensagem: `id ${id} deletado`})
        }catch(error){

            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res){

        const { id } = req.params;

        try{

            await pessoasServices.restauraRegistro(id);
            return res.status(200).json({mensagem: `id ${id} restaurado!`})
        } catch (error){

           return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula(req, res){

        const { estudanteId, matriculaId } = req.params;

        try{

            const umaMatricula = await matriculasServices.buscaUmaMatricula(estudanteId, matriculaId);
            return res.status(200).json(umaMatricula);
        }catch (error){
            
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsMatriculas(req, res){

        const { estudanteId } = req.params;

        try{

            const todasAsMatriculas = await matriculasServices.buscaTodasAsMatriculas(estudanteId);

            return res.status(200).json(todasAsMatriculas);
        } catch (error){

            return res.status(500).json(error.message);
        }
    }
    static async criaMatricula(req, res){

        const { estudanteId } = req.params;

        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };

        try{

            const novaMatriculaCriada = await matriculasServices.criaMatricula(novaMatricula);
            res.status(200).json(novaMatriculaCriada);
        }catch(error){

            return res.status(500).json(error.message);
        }
    }
    static async atualizaMatricula(req,res){

        const novasInfos = req.body;
        const { estudanteId, matriculaId } = req.params;

        try{
            
            await matriculasServices.atualizaMatricula(novasInfos, estudanteId, matriculaId);
            const matriculaAtualizada = await matriculasServices.buscaUmaMatricula(estudanteId, matriculaId);
            return res.status(200).json(matriculaAtualizada);
        }catch(error){

            return res.status(500).json(error.message);
        }
    }
    
    static async apagaMatricula(req, res){

        const { estudanteId, matriculaId } = req.params;
        
        try{

            await matriculasServices.apagaMatricula(matriculaId);
            return res.status(200).json({mensagem: `Matrícula ${matriculaId} deletado`})
        }catch(error){

            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res){

        const {estudanteId, matriculaId} = req.params;

        try{

            await matriculasServices.restauraMatricula(matriculaId);
            return res.status(200).json({mensagem: `Matrícula ${matriculaId} restaurada`})
        }catch(error){

            return res.status(500).json(error.message);
        }
    }

    static async buscaMatriculas(req, res){

        const { estudanteId } = req.params;
        
        try{

            const pessoa = await matriculasServices.pegaUmRegistro(estudanteId);
            const matriculas = await pessoa.getAulasMatriculadas();

            return res.status(200).json(matriculas);
        }catch(error){

            return res.status(500).json(error.message);
        }
    }
    static async buscaMatriculasPorTurma(req, res){

        const { turmaId } = req.params;
        
        try{

            const todasAsMatriculas = await matriculasServices.buscaMatriculaPorTurma(turmaId);

            return res.status(200).json(todasAsMatriculas);
        }catch(error){

            return res.status(500).json(error.message);
        }
    }
    static async buscaTurmasLotadas(req, res){

        const lotacaoTurma = 2;

        try{

            const turmasLotadas = await matriculasServices.buscaTurmasLotadas(lotacaoTurma);

            return res.status(200).json(turmasLotadas);
        }catch (error){

            return res.status(500).json(error.message);
        }
    }
    static async cancelaPessoa(req,res){

        const { estudanteId } = req.params;
        try{

            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({ message: `Matrículas ref. estudante ${estudanteId} foram canceladas.`})           
        }catch (error){

            return res.status(500).json(error.message);
        }
    }
}


module.exports = PessoaController;