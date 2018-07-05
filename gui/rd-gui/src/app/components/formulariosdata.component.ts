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

	getElement(id: string): HTMLInputElement {
		return (<HTMLInputElement> document.getElementById(id));
	}

	onChange(formulario: Formulario): void {
		var checkBox = this.getElement(formulario.email);
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

	selectAll(): void {
		this.auxSelect(this.formularios, true, 'checked');
	}

	deselectAll(): void {
		this.auxSelect(this.formRemover, false, 'unchecked');		
	}

	auxSelect(formArray: Formulario[], statusCheck: boolean, statusValue: string): void {
		for (let f of formArray) {
			var checkBox = this.getElement(f.email);
			checkBox.checked = statusCheck;
			checkBox.value = statusValue;
			if (formArray == this.formRemover) {
				this.deselect(f);
			} else /* if (formArray == this.formularios) */ {
				this.selectf(f);
			}
		}
	}

	onChangeAll(): void {
		var checkBox = this.getElement('checkAll');
		var statusValue = checkBox.value;
		checkBox.value = this.changeValue(statusValue);

		if (checkBox.value == 'checked') {
			this.selectAll();
		} else {
			this.deselectAll();
		}
	}

	removerSelecionados(): void {
		this.remover(this.formRemover);
	}

	removerTodos(): void {
		this.remover(this.formularios);
	}

	remover(formArray: Formulario[]): void {
		if (formArray.length > 0) {
			this.hideMessage('msgUnselected');
			for (let f of formArray) {
				this.removerFormulario(f);
			}
			this.showMessage('msgSuccess');
			if (formArray == this.formRemover) {
				this.deselectAll();
			}
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
		this.getElement(id).hidden = true;
	}

	showMessage(id: string): void {
		this.getElement(id).hidden = false;
	}

	ngOnInit(): void {
		this.formularioService.getFormularios()
		.then(formularios => this.formularios = formularios)
		.catch(erro => alert(erro));
	}

}
