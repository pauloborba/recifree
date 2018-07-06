import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

defineSupportCode(function ({ Given, When, Then }) {
	Given(/^eu estou na página "(.*?)"$/, async (pagina) => {
        await browser.get("http://localhost:4200/"+<string> pagina);
        await expect(browser.getTitle()).to.eventually.equal('Recifree');
    })

    Given(/^existe formulário com email "(.*?)" na lista de formulários$/, async (email) => {
    	await browser.get("http://localhost:4200/formulariosdata");
        var emails : ElementArrayFinder = element.all(by.name('lista_emails'));
        var findEmail = emails.filter(elem =>
                                      elem.getText().then(text => text === email));
        await findEmail;
        await findEmail.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        await browser.get("http://localhost:4200/formularios");
    });

    When(/preencho o campo "(.*?)" com "(.*?)"$/, async (campo, info) => {
        await $("[name=\'"+ <string> campo +"\']").sendKeys(<string> info);
    })

    When(/^eu seleciono a opção "(.*?)"$/, async (opcao) => {
        await element(by.buttonText(<string> opcao)).click();
    });

    Then(/^eu vejo a mensagem "(.*?)"$/, async (msg) => {
    	var msgs = element.all(by.name('msg'));
    	var findMsg = msgs.filter(elem => elem.getText().then(text => text === msg));
        await findMsg;
        await findMsg.then(elem => expect(Promise.resolve(elem.length)).to.eventually.equal(1));
    })

})

