
//Random Locator function
function getRandomLocator(locators) {
    // Get a random index
    const randomIndex = Math.floor(Math.random() * locators.length);
    // Return the randomly selected locator
    return locators[randomIndex];
  }
  
  export default getRandomLocator;