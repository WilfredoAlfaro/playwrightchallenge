import {test, expect} from '@playwright/test';


test('login with valid credentials', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    //Locators
    const loginButton = page.getByText('Login');
    const userNameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const sauceBackpack = page.locator('(//div[@class="inventory_item_description"])[1]/div[2]/button');

    //Actions
    await userNameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
    expect(sauceBackpack).toBeVisible();
    await sauceBackpack.click();
    expect(sauceBackpack).toContainText('Remove');

});




