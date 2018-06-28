import { Formulario } from '../../gui/rd-gui/src/app/components/formulario';

export class CadastroDeFormularios {
  formularios: Formulario[] = [];

  cadastrar(novoform: Formulario): Formulario {
    var aux = null;
    if (this.emailNaoCadastrado(novoform.email)) {
      aux = new Formulario();
      aux.copy(novoform);
      this.formularios.push(aux);
    }
    return aux;
  }

  //retorna se o email passado já está cadastrado ou nao
  emailNaoCadastrado(email: string): boolean {
	  return !this.formularios.find(f => f.email == email);
  }

  getFormularios(): Formulario[] {
    return this.formularios;
  }
}