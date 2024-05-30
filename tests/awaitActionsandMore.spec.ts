import {test, expect} from '@playwright/test'

test('waits, scroll and more', async({page}) =>{
    await page.goto('https://practice-automation.com/');

    //Home Page locators
    const jsDilayTestButton = page.getByText('JavaScript Delays');
    const adsTestButton = page.getByText('Ads');
    const accordionsButton = page.getByText('Accordions');

    await accordionsButton.scrollIntoViewIfNeeded();
    await jsDilayTestButton.scrollIntoViewIfNeeded();

    //JavaScript Dilay Test Locators
    const dilayStartButton = page.getByRole('button').filter({hasText: 'Start'});
    const inputText = page.getByRole('textbox');
    

    //JavaScript Dilay Test Actions
    await jsDilayTestButton.click();
    await expect(page).toHaveURL(/.*javascript-delays/) 
    await page.screenshot({ path: 'testScreenshots/fullPage/dilayTest.png', fullPage: true });

    await expect(dilayStartButton).toBeVisible();
    await expect(inputText).toBeVisible();

    await dilayStartButton.click()
    await page.waitForTimeout(11000);
    expect(await inputText.inputValue()).toEqual('Liftoff!');
    await page.screenshot({path:'testScreenshots/singleElement/dilayTest1.png'});

    await page.reload();
    await dilayStartButton.click();
    const slowExpect = expect.configure({ timeout: 11000 });
    slowExpect(await inputText.inputValue()).toEqual('Liftoff!');







});