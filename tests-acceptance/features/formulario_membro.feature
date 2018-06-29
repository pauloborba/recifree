Feature: As a membro do coletivo Recifree
		 I want to ter acesso aos formulários enviados pelas pessoas interessadas em participar do coletivo
		 So that eu possa analisar as informações e assim selecionar novos membros

Scenario: Salvar formulários em um arquivo externo (GUI)
Given eu estou na página "Formulários"
Given eu vejo um formulário com email "alicesiq@hotmail.com" na lista de formulários
Given eu vejo um formulário com email "alain@jc.com.br" na lista de formulários
Given eu vejo as opções "Baixar todos" e "Baixar selecionados"
When eu seleciono a opção "Baixar todos"
Then é gerado um arquivo de nome "formularios.xls" com as informações dos formulários de email "alicesiq@hotmail.com" e "alain@jc.com.br"
Then o arquivo "formularios.xls" é baixado localmente
Then eu vejo uma mensagem de confirmação para "Formulários baixados com sucesso"

Scenario: Remover formulários (GUI)
Given eu estou na página "Formulários"
Given o sistema tem "2" formulários cadastrados na lista de formulários
Given eu vejo um formulário com email "alicesiq@hotmail.com"
Given eu vejo as opções "Remover todos" e "Remover selecionados"
When eu seleciono o formulário com email "alicesiq@hotmail.com" na lista de formulários
When eu seleciono a opção "Remover selecionados"
Then eu vejo uma mensagem de confirmação para "Formulários removidos com sucesso"
Then eu vejo "1" formulários cadastrados na lista de formulários
Then eu não vejo mais o formulário com email "alicesiq@hotmail.com" na lista de formulários
