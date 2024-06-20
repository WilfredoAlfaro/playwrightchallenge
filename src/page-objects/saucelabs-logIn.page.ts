import{expect,selectors,type Locator, type Page} from '@playwright/test';


class SaucelabsLoginPage {

    readonly page : Page
    readonly usernameInput : Locator
    readonly passwordInput : Locator
    readonly loginButton : Locator
    readonly swagLabsLabel : Locator
    readonly standardUser : string
    readonly password : string
    readonly saucelabUrl : string
    

    constructor(page : Page){
        selectors.setTestIdAttribute('data-test');    
        this.page = page
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByTestId('login-button');
        this.swagLabsLabel = page.getByText('Swag Labs');
        this.standardUser = 'standard_user';
        this.password = 'secret_sauce';
        this.saucelabUrl = "https://www.saucedemo.com";

    }

    //Url Navigation function
    async goToSaucelabUrl(): Promise <void> {
        await this.page.goto(this.saucelabUrl);
    }

    //Add user name function
    async addUserName(): Promise<void> {
        expect(this.usernameInput).toBeVisible();
        await this.usernameInput.fill(this.standardUser);
    }
    
    //Add password function
    async addPasssword(): Promise<void> {
        expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(this.password);
    }

    //login click function
    async clickLogin(): Promise<void>{
        expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

    //Login page validation
    async loginPagevalidation(): Promise<void> {
        expect(this.swagLabsLabel).toContainText('Swag Labs');
    }

}

export default SaucelabsLoginPage