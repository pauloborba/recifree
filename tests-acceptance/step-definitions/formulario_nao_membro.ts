import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let existeEmail = ((elem, email) => elem.element(by.name('listadeemails')).getText().then(text => text === email));


defineSupportCode(function ({ Given, When, Then }) {
	Given(/^eu estou na página "(.*?)"$/, async (pagina) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Recifree');
        await element(by.linkText(<string> pagina)).click();
    })

    Given(/^existe formulário com email "(.*?)" na lista de formulários$/, async (email) => {
        var emails : ElementArrayFinder = element.all(by.name('listadeemails'));
        var findEmail = emails.filter(elem =>
                                      elem.getText().then(text => text === email));
        await findEmail;
        await findEmail.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/(^eu preencho o campo )?"(.*?)" com "(.*?)"$/, async (campo, info) => {
        await $("input[name='"+ campo +"']").sendKeys(<string> info);
    })

    When(/^eu seleciono a opção "(.*?)"$/, async (opcao) => {
        await element(by.buttonText(<string> opcao)).click();
    });

    Then(/^eu vejo uma mensagem de erro para "(.*?)"$/, async (msgerror) => {
    	var msg = element(by.name('msgerro'));
    	await expect(msg.getText()).toEqual(<string> msgerror); //.toBe
    })

        Then(/^eu vejo uma mensagem de confirmação para "(.*?)"$/, async (msgconf) => {
    	var msg = element(by.name('msg'));
    	await expect(msg.getText()).toEqual(<string> msgconf); //.toBe
    });

})

