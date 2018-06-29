Feature: As a pessoa interessada em fazer parte do coletivo Recifree
		 I want to preencher e enviar minhas informações por meio de um formulário
		 So that eu possa informar meu interesse em participar do coletivo e assim ser selecionado

Scenario: Preenchimento mal sucedido pela ausência de dados obrigatórios (GUI)
Given eu estou na página "formularios"
When eu preencho o campo "nome" com "Alain de Castro"
When preencho o campo "idade" com "34"
When preencho o campo "telefone" com "(81) 8864-2730"
When preencho o campo "email" com "alain@jjc.com.br"
When preencho o campo "ocupacao" com "Jornalista"
When preencho o campo "pergunta1" com "Há alguns meses venho pesquisando sobre Redução de Danos e encontrei o coletivo recentemente nesse processo"
When preencho o campo "pergunta2" com "Gostaria de me engajar e participar das discussões e atividades do coletivo. Penso que seria o ideal para que eu possa produzir conteúdo de qualidade pautado na questão da Redução de Danos"
When preencho o campo "pergunta3" com "Um rascunho com o resumo de minhas pesquisas pode ser lido aqui: https://goo.gl/cvXPJS"
When eu seleciono a opção "Enviar"
Then eu vejo uma mensagem de erro para "* Preencha todos os campos."


Scenario: Cadastrar formulário (GUI)
Given eu estou na página "formularios"
When eu preencho o campo "nome" com "Alice Siqueira"
When preencho o campo "idade" com "25"
When preencho o campo "telefone" com "(81) 98622-1334"
When preencho o campo "email" com "alicesiqq@hotmail.com"
When preencho o campo "ocupacao" com "Designer"
When preencho o campo "endereco" com "Rua da Hora, número 65, bairro do Espinheiro, Recife"
When preencho o campo "pergunta1" com "Achei interessante ter essa iniciativa no Estado"
When preencho o campo "pergunta2" com "Desejo contribuir para a divulgação da causa"
When preencho o campo "pergunta3" com "Pouco conhecimento"
When eu seleciono a opção "Enviar"
Then eu vejo uma mensagem de confirmação para "Formulário cadastrado com sucesso!"


Scenario: Enviar formulário com email já cadastrado (GUI)
Given eu estou na página "formularios"
Given existe formulário com email "alicesiq@hotmail.com" na lista de formulários
When eu preencho o campo "nome" com "Alice Siqueira"
When preencho o campo "idade" com "25"
When preencho o campo "telefone" com "(81) 98622-1334"
When preencho o campo "email" com "alicesiq@hotmail.com"
When preencho o campo "ocupacao" com "Designer"
When preencho o campo "endereco" com "Rua da Hora, número 65, bairro do Espinheiro, Recife"
When preencho o campo "pergunta1" com "Achei interessante ter essa iniciativa no Estado"
When preencho o campo "pergunta2" com "Desejo contribuir para a divulgação da causa"
When preencho o campo "pergunta3" com "Pouco conhecimento"
When eu seleciono a opção "Enviar"
Then eu vejo uma mensagem de erro para "E-mail já cadastrado."
When eu seleciono a opção "Atualizar formulário"
Then eu vejo uma mensagem de confirmação para "Formulário atualizado com sucesso!"