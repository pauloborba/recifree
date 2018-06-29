import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Formulario } from './formulario';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css'],
  providers: [FormularioService]
})

export class FormulariosComponent implements OnInit {
	
	constructor(private formularioService: FormularioService) {}
	
	formulario: Formulario = new Formulario();
	formularios: Formulario[] = [];
	
	emailCadastrado: boolean = false;
	foiAtualizado: boolean = false;
	foiCadastrado: boolean = false;
	camposPreenchidos: boolean = false;

	cadastrarFormulario(formulario: Formulario): void {
		this.resetMensagem();
		this.isTodosCamposPreenchidos(formulario);
		
		if (this.camposPreenchidos) {
		this.formularioService.cadastrar(formulario)
		.then(novof => {
			if (novof) {
				this.formularios.push(novof);
				this.formulario = new Formulario();
				this.foiCadastrado = true;
			} else {
				this.emailCadastrado = true;
			}
		})
		.catch(erro => alert(erro));
		
		}
	}
	
	atualizarCadastro(formulario: Formulario): void {
		this.resetMensagem();
		this.isTodosCamposPreenchidos(formulario);
		
		if (this.camposPreenchidos) {
		this.formularioService.atualizar(formulario);
		this.foiAtualizado = true;
		this.resetEmail();
		}
	}
	
	cancelar(): void {
		this.resetEmail();
	}
	
	resetEmail(): void { this.emailCadastrado = false; }
	
	resetCamposPreenchidos(): void { this.camposPreenchidos = false; }
	
	resetMensagem(): void {
		this.foiAtualizado = false;
		this.foiCadastrado = false;
	}
	
	isEmpty(campo: string): boolean {
		if (campo == "") { return true }
		return false;
	}
	
	isTodosCamposPreenchidos(formulario: Formulario): void {
		if (!this.isEmpty(formulario.nome) &&
		    !this.isEmpty(formulario.idade) && 
			!this.isEmpty(formulario.telefone) && 
			!this.isEmpty(formulario.email) && 
			!this.isEmpty(formulario.ocupacao) && 
			!this.isEmpty(formulario.endereco) && 
			!this.isEmpty(formulario.pergunta1) && 
			!this.isEmpty(formulario.pergunta2) && 
			!this.isEmpty(formulario.pergunta3))
			{
				this.camposPreenchidos = true;
			}
	}
	
	ngOnInit(): void {
		this.formularioService.getFormularios()
		.then(formularios => this.formularios = formularios)
		.catch(erro => alert(erro));
		this.resetMensagem();
	}
	
}
