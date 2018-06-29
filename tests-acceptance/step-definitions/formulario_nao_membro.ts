import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let existeEmail = ((elem, email) => elem.element(by.name('listadeemails')).getText().then(text => text === email));


defineSupportCode(function ({ Given, When, Then }) {
	Given(/^eu estou na página "(.*?)"$/, async (pagina) => {
        await browser.get("http://localhost:4200/"+<string> pagina);
        await expect(browser.getTitle()).to.eventually.equal('Recifree');
    })

    Given(/^existe formulário com email "(.*?)" na lista de formulários$/, async (email) => {
    	await browser.get("http://localhost:4200/formulariosdata");
        var emails : ElementArrayFinder = element.all(by.name('lista_formularios'));
        var findEmail = emails.filter(elem =>
                                      elem.getText().then(text => text === email));
        await findEmail;
        await findEmail.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/preencho o campo "(.*?)" com "(.*?)"$/, async (campo, info) => {
        await $("[name=\'"+ <string> campo +"\']").sendKeys(<string> info);
    })

    When(/^eu seleciono a opção "(.*?)"$/, async (opcao) => {
        await element(by.buttonText(<string> opcao)).click();
    });

    Then(/^eu vejo uma mensagem de erro para "(.*?)"$/, async (msgerror) => {
    	var msg = $("[name='msgerro']").getText();
        await expect(msg).to.eventually.equal(<string> msgerror);
    })

    Then(/^eu vejo uma mensagem de confirmação para "(.*?)"$/, async (msgconf) => {
    	var msg = $("[name='msgconf']").getText();
        await expect(msg).to.eventually.equal(<string> msgconf);
    });

})

