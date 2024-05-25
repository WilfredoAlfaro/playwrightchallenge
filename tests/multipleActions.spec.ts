import {test, expect, selectors} from '@playwright/test';
import getRandomLocator from '../randomMethod.ts'


test('Multiple Actions test', async ({page}) => {
    await page.goto('https://practice-automation.com/')
    
    //HomePage locators
    const formFieldsButton = await page.getByText('Form Fields');
    const slidersButton = await page.getByText('Sliders');
    const tablesButton = await page.getByText('Tables');
    const windowsButton = await page.getByText('Window Operations');
    const fileUploadButton = await page.getByText('File Upload');
    const iframesButton = await page.getByText('Iframes');

    //HomePage actions
    formFieldsButton.click();
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
    await getRandomLocator(drinks).setChecked(true);
    await getRandomLocator(color).check();
    await  siblings.selectOption({index:Math.floor(Math.random() * 3)});
    await email.fill('testing@gmail.com');
    await textArea.fill('This is just a test');
});

