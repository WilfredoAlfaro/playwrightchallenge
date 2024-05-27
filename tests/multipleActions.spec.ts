import {test, expect, selectors} from '@playwright/test';
import randomMethods from '../randomMethod.ts'

test('Multiple Actions test', async ({page}) => {
    await page.goto('https://practice-automation.com/')
    const methods = new randomMethods(); //Object to get the methods from another class

    //HomePage locators
    const formFieldsButton = page.getByText('Form Fields');
    const slidersButton = page.getByText('Sliders');
    const tablesButton = page.getByText('Tables');
    const windowsButton = page.getByText('Window Operations');
    const fileUploadButton = page.getByText('File Upload');
    const iframesButton = page.getByText('Iframes');

    //Form field Test 
    await formFieldsButton.click();
    await expect(page).toHaveURL(/.*form-fields/)


    //Form field page locators
    selectors.setTestIdAttribute('data-cy');
    const nameInput = page.getByTestId('name');
    
    //Drink locators
    const drinks =[
         page.getByTestId('drink1'),
         page.getByTestId('drink2'),
         page.getByTestId('drink3'),
         page.getByTestId('drink4'),
         page.getByTestId('drink5')
    ]  
    //Color locators
    const color = [
         page.getByTestId('color1'),
         page.getByTestId('color2'),
         page.getByTestId('color3'),
         page.getByTestId('color4'),
         page.getByTestId('color5')
    ]
    //Dropdown
    const siblings =  page.getByTestId('siblings');
    //email input 
    const email =  page.getByTestId('email');
    //textbox
    const textArea =  page.getByTestId('message')

    //Form fields actions
    expect(nameInput).toBeVisible();
    await nameInput.fill('Nelson Mandela');
    await methods.getRandomLocator(drinks).setChecked(true);
    await methods.getRandomLocator(color).check();
    await  siblings.selectOption({index:Math.floor(Math.random() * 3)});
    await email.fill('testing@gmail.com');
    await textArea.fill('This is just a test');

    //return to homePage
    await page.goBack();
   

    //Slider Button test
    await slidersButton.click();
    await expect(page).toHaveURL(/.*slider/)

    //Slider page locators
    const currentValueElement = page.locator('id=value');
    const slideButton = page.locator('id=slideMe');

    //Slider page actions

    await slideButton.click();
    expect(await currentValueElement.textContent()).toEqual('50');
    await page.keyboard.press('ArrowLeft');
    expect(await currentValueElement.textContent()).toEqual('49');

    
});

