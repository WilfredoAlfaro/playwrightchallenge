

class randomMethods{

 
//Random Locator Method
 getRandomLocator(locators) {
  // Get a random index
  const randomIndex = Math.floor(Math.random() * locators.length);
  // Return the randomly selected locator
  return locators[randomIndex];
}

/*async function keyPress(locator){
await locator.click();
for(let i = 0; i < 3; i ++){
  await locator.press('ArrowLeft');
}
}
*/


}

  
  export default randomMethods;