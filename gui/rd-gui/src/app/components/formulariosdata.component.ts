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
		var checkBox = this.newCheckboxValue(formulario.email);
		if (checkBox == 'checked') {
			this.selectf(formulario);
		} else {
			this.deselect(formulario);
		}
	}

	onChangeAll(): void {
		var checkBox = this.newCheckboxValue('checkAll');
		if (checkBox == 'checked') {
			this.selectAll();
		} else {
			this.deselectAll();
		}
	}

	newCheckboxValue(id: string): string {
		var checkBox = this.getElement(id);
		var statusValue = checkBox.value;
		checkBox.value = this.changeValue(statusValue)
		return checkBox.value;
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
		/* ao marcar um item, verifica se todos ficaram marcados,
		ou seja, que os arrays tem o mesmo tamanho. Se for verdade, o checkbox
		que marca todos é marcado.
		*/
		if (this.formRemover.length == this.formularios.length) {
			this.changeCheckboxStatus('checkAll', true, 'checked');
		}
	}

	deselect(formulario: Formulario): void {
		this.formRemover = this.formRemover.filter(f => f.email !== formulario.email);
		/* ao desmarcar um item, verifica se checkbox que marca todos esta marcado.
		Se estiver, ele é desmarcado. */
		if (this.getElement('checkAll').checked) {
			this.changeCheckboxStatus('checkAll', null, 'unchecked');
		}
	}

	changeCheckboxStatus(elementID: string, statusCheck: boolean, statusValue: string): void {
		this.getElement(elementID).checked = statusCheck;
		this.getElement(elementID).value = statusValue;
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
