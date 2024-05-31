import {test, expect, selectors} from '@playwright/test';
import randomMethods from '../randomMethod.ts'
import path from 'path';

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
    const amountOfMovements = 10;
    const isLeft = false;
    await slideButton.click();
    expect(await currentValueElement.textContent()).toEqual('50');
    for (let i = 0; i < amountOfMovements; i++) {
     await page.keyboard.press(`${isLeft? 'ArrowLeft' : 'ArrowRight'}`);
    }
    expect(await currentValueElement.textContent()).toEqual('60');

    //Return to homePage
    await page.goBack();

    //Table button test
    await tablesButton.click();
    await expect(page).toHaveURL(/.*tables/)

    //Table page locators
    const tableSearch = page.getByLabel('Search:');
    const dynamicTable = page.locator('id=tablepress-1').filter({has:page.locator('tbody  ')});
    const dynamicTableRows = dynamicTable.locator('tr').locator(':scope').locator('td');
    const dynamicTableData: string [] = [];

    await expect(tableSearch).toBeVisible();
    //await expect(staticTable).toBeVisible();

    //Table test actions
    await tableSearch.fill('China');
    for (const text of await dynamicTableRows.allInnerTexts()){
     dynamicTableData.push(text);
    }
    expect(dynamicTableData).toHaveLength(3);
    console.log(dynamicTableData);

    //Return to homePage
    await page.goBack();
    

    //Upload file test 
    await fileUploadButton.click();
    await expect(page).toHaveURL(/.*file-upload/);

    //Upload file test locators
    const chooseFileButton = page.locator('#file-upload');
    const submitbutton = page.getByRole('button', {name: 'upload'});
    const responseLabel = page.locator('div.wpcf7-response-output');
    await expect(chooseFileButton).toBeVisible();
    await expect(submitbutton).toBeVisible();

    //Upload file test action
    await chooseFileButton.setInputFiles(path.join(process.cwd(),'/assets/testCheck.jpg'));
    await submitbutton.click();
    await expect(responseLabel).toHaveText('Thank you for your message. It has been sent.');
   console.log(await responseLabel.textContent());
    

   //Return to homepage
   await page.goBack();

   //Iframe test 
   await iframesButton.click();
   await expect(page).toHaveURL(/.*iframes/);

   //Iframe Locators
   const seleniumOption = page.frameLocator('#frame1').getByText('Projects');
   const hompageButton = page.getByAltText('automateNow Logo');
   //Iframe actions
   await expect(seleniumOption).toBeVisible();
   await seleniumOption.click();

   //Return to hompage
   await hompageButton.click();

   //Windows operation test 
   await windowsButton.click();
   await expect(page).toHaveURL(/.*window-operations/);

   //windows handler locators
   const newTab = page.getByRole('button', {name:'New Tab'});
   
   //Windows operations actions
   await expect(newTab).toBeVisible();

   const [newPage] = await Promise.all([
     page.context().waitForEvent('page'),
     newTab.click()
   ]);
   await newPage.close();
   await expect(page).toHaveURL(/.*window-operations/);
    
 
});

