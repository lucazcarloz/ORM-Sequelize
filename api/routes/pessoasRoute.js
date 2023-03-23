const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router
    .get('/pessoas', PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
    .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
    .get('/pessoas/:estudanteId/matricula', PessoaController.buscaMatriculas)
    .get('/pessoas/:estudanteId/matriculas', PessoaController.pegaTodasAsMatriculas)
    .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
    .get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.buscaMatriculasPorTurma)
    .get('/pessoas/matricula/lotadas', PessoaController.buscaTurmasLotadas)
    .post('/pessoas', PessoaController.criaPessoa)
    .post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
    .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
    .post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
    .post('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.restauraMatricula)
    .put('/pessoas/:id', PessoaController.atualizaPessoa)     
    .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
    .delete('/pessoas/:id', PessoaController.apagaPessoa)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)
    
module.exports = router;