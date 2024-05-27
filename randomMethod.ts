

class randomMethods{

 
//Random Locator Method
 getRandomLocator(locators) {
  // Get a random index
  const randomIndex = Math.floor(Math.random() * locators.length);
  // Return the randomly selected locator
  return locators[randomIndex];
}

keyPress(locator, page){
locator.click();
for(let i = 0; i < 3; i ++){
  page.keyboard.press('Arrowleft');
}

}


}

  
  export default randomMethods;