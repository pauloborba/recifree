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
	formRemover: Formulario[] = [];

	onChange(formulario: Formulario) {
		var checkBox = (<HTMLInputElement> document.getElementById(formulario.email));
		var statusValue = checkBox.value;
		checkBox.value = this.changeValue(statusValue);

		if (checkBox.value == 'checked') {
			this.selectf(formulario);
		} else {
			this.deselect(formulario);
		}
	}

	changeValue(value: string): string {
		if (value == 'unchecked') {
			return 'checked';
		}
		return 'unchecked';
	}

	selectf(formulario: Formulario): void {
		if (!this.formRemover.includes(formulario)) {
			this.formRemover.push(formulario);
		}
	}

	deselect(formulario: Formulario): void {
		this.formRemover = this.formRemover.filter(f => f.email !== formulario.email);
	}

	removerSelecionados(): void {
		if (this.formRemover.length > 0) {
			this.hideMessage('msgUnselected');
			for (let f of this.formRemover) {
				this.removerFormulario(f);
			}
			this.showMessage('msgSuccess');
			this.formRemover = []; //reiniciando
		} else {
			this.showMessage('msgUnselected');
		}
	}

	removerTodos(): void {
		if (this.formularios.length > 0) {
			this.hideMessage('msgUnselected');
			for (let f of this.formularios) {
				this.removerFormulario(f);
			}
			this.showMessage('msgSuccess');
		} else {
			this.showMessage('msgUnselected');
		}
	}

	removerFormulario(formulario: Formulario): void {
		this.formularioService.remover(formulario)
		.then(formularios => this.formularios = formularios)
		.catch(erro => alert(erro));
	}

	hideMessage(id: string): void {
		(<HTMLInputElement> document.getElementById(id)).hidden = true;
	}

	showMessage(id: string): void {
		(<HTMLInputElement> document.getElementById(id)).hidden = false;
	}

	ngOnInit(): void {
		this.formularioService.getFormularios()
		.then(formularios => this.formularios = formularios)
		.catch(erro => alert(erro));
	}

}
