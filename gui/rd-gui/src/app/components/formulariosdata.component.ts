import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Formulario } from './formulario';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'formulariosdata',
  templateUrl: './formulariosdata.component.html',
  styleUrls: ['./formulariosdata.component.css'],
  providers: [FormularioService]
})

export class FormulariosDataComponent implements OnInit {
	
	constructor(private formularioService: FormularioService) {}
	
	formularios: Formulario[];

	removerFormulario(formulario: Formulario): void {
		this.formularioService.remover(formulario)
		.then(formularios => this.formularios = formularios)
		.catch(erro => alert(erro));
	}
		
	ngOnInit(): void {
		this.formularioService.getFormularios()
		.then(formularios => this.formularios = formularios)
		.catch(erro => alert(erro));
	}

}
