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


var server = app.listen(3000, function () {
  console.log('Recifree app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app, server, closeServer }
