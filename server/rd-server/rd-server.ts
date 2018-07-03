import express = require('express');
import bodyParser = require("body-parser");

import { Formulario } from '../../gui/rd-gui/src/app/components/formulario';
import { CadastroDeFormularios } from './cadastrodeformularios';

var app = express();

var cadastroForm: CadastroDeFormularios = new CadastroDeFormularios();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/formulariosdata', function (req, res) {
	console.log('GET /formulariosdata: ' + req)
	res.send(JSON.stringify(cadastroForm.getFormularios()));
})

app.delete('/formulariosdata', function (req: express.Request, res: express.Response) {
	var formulario: Formulario = <Formulario> req.body;
	console.log('DELETE /formulariosdata: ' + req + ' w/ email: ' + formulario.email)
	res.send(JSON.stringify(cadastroForm.remover(formulario)));
});

app.post('/formulario', function (req: express.Request, res: express.Response) {
	console.log('POST /formulario: ' + req)
	var formulario: Formulario = <Formulario> req.body;
	formulario = cadastroForm.cadastrar(formulario);
	if (formulario) {
		res.send({"success": "Formulário cadastrado com sucesso"});
	} else {
		res.send({"failure": "Formulário não cadastrado"});
	}
})

app.put('/formulario', function (req: express.Request, res: express.Response) {
	console.log('PUT /formulario: ' + req)
	var formulario: Formulario = <Formulario> req.body;
	formulario = cadastroForm.atualizar(formulario);
	if (formulario) {
		res.send({"success": "Formulário atualizado com sucesso"});
	} else {
		res.send({"failure": "Formulário não atualizado"});
	}
})

var server = app.listen(3000, function () {
  console.log('Recifree app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app, server, closeServer }
