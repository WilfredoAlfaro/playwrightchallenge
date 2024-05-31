import {test, expect} from '@playwright/test'

test('waits, scroll and more', async({page}) =>{
    await page.goto('https://practice-automation.com/');

    //Home Page locators
    const jsDilayTestButton = page.getByText('JavaScript Delays');
    const adsTestButton = page.getByText('Ads');
    const accordionsButton = page.getByText('Accordions');

    //Scroll actions on homepage
    await accordionsButton.scrollIntoViewIfNeeded();
    await jsDilayTestButton.scrollIntoViewIfNeeded();

    //JavaScript Dilay test page
    await jsDilayTestButton.click();
    await expect(page).toHaveURL(/.*javascript-delays/) 

    //JavaScript Dilay Test Locators
    const dilayStartButton = page.getByRole('button').filter({hasText: 'Start'});
    const inputText = page.getByRole('textbox');
    

    //JavaScript Dilay Test Actions
    await page.screenshot({ path: 'testScreenshots/fullPage/dilayTest.png', fullPage: true });

    await expect(dilayStartButton).toBeVisible();
    await expect(inputText).toBeVisible();

    await dilayStartButton.click()
    await page.waitForTimeout(11000);
    expect(await inputText.inputValue()).toEqual('Liftoff!');
    await page.screenshot({path:'testScreenshots/singleElement/dilayTest1.png'});

    //Second wait ussage
    await page.reload();
    await dilayStartButton.click();
   await expect(inputText).toHaveValue('Liftoff!', {timeout:21000});


    //Go Back to hompage
    page.goBack();

    //Ads test page
    await adsTestButton.click();
    await expect(page).toHaveURL(/.*ads/)
    await page.screenshot({ path: 'testScreenshots/fullPage/BeforeAds.png', fullPage: true });

    //Ads test page locators
   const adsText = page.getByText('I am an ad.');
   const closeAds = page.getByRole('button', {name:'close'});

   //Ads test actions
   await adsText.waitFor({timeout: 10000});
   await expect(adsText).toHaveText('I am an ad.');
   await page.screenshot({path:'testScreenshots/singleElement/adsText1.png'});
   await page.screenshot({ path: 'testScreenshots/fullPage/AfterAds.png', fullPage: true });

   await expect(closeAds).toBeVisible();
   await closeAds.click()

    







});