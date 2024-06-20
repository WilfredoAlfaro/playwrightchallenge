import {test, expect, selectors} from '@playwright/test';
import SaucelabsLoginPage from '../../src/page-objects/saucelabs-logIn.page';
import SaucelabsHomePage from '../../src/page-objects/saucelabs-homePage.page';
import SaucelabsCheckout from '../../src/page-objects/saucelabs-checkout.page';

test.describe('Login Page Scenarios', () => {

    test('TC01: Login Page validation @SmokeTest @Regression', async ({page}) => {
        const loginPage = new SaucelabsLoginPage(page);
        await loginPage.goToSaucelabUrl();
        await loginPage.loginPagevalidation();
        await loginPage.addUserName();
        await loginPage.addPasssword();
        await loginPage.clickLogin();
        await loginPage.page.waitForTimeout(1000);
        await loginPage.page.close();
    });


    test('TC02 Login and add to cart test @Regression', async ({page}) => {
        const loginPage = new SaucelabsLoginPage(page);
        const homePage = new SaucelabsHomePage(page); 
        await loginPage.goToSaucelabUrl();
        await loginPage.loginPagevalidation();
        await loginPage.addUserName();
        await loginPage.addPasssword();
        await loginPage.clickLogin();
        await homePage.validateHompage()
        await homePage.clickonRandomItem();
        await homePage.validateCheckoutIcon();
        await homePage.clickOnCart();
        await homePage.page.waitForTimeout(1000);
        await homePage.page.close();

    });


    test('TC03 Login, Add to cart and checkout Test @SmokeTest @Regression', async ({page}) => {
        const loginPage = new SaucelabsLoginPage(page);
        const homePage = new SaucelabsHomePage(page); 
        const checkoutPage = new SaucelabsCheckout(page);
        await loginPage.goToSaucelabUrl();
        await loginPage.loginPagevalidation();
        await loginPage.addUserName();
        await loginPage.addPasssword();
        await loginPage.clickLogin();
        await homePage.validateHompage()
        await homePage.clickonRandomItem();
        await homePage.validateCheckoutIcon();
        await homePage.clickOnCart();
        await checkoutPage.validateButtons();
        await checkoutPage.validateCheckout();
        await checkoutPage.validateItemsSelected(await homePage.selectedItem());
        await homePage.page.waitForTimeout(1000);
        await checkoutPage.page.close();

    });





})

