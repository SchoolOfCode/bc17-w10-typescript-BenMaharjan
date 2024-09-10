//HTMLElement | null: Tells TypeScript to treat the element as an HTMLElement (if it exists), or null (if it doesn't exist). 
//This type assertion gives you access to HTMLElement-specific properties (like innerHTML, textContent, etc.)
//Also handles cases where the element might not be found.
const jokeElement = document.getElementsByClassName("getJoke")[0] as HTMLElement | null;
const quoteElement = document.getElementsByClassName("dadJoke")[0] as HTMLElement | null;

//Without type assertion, TypeScript would assign the variable jokeElement the type Element | undefined. 
//This would create issues when trying to access properties specific to an HTMLElement (like innerHTML or addEventListener), 
//because Element doesn't have all the methods and properties that an HTMLElement does. 
//Additionally, TypeScript needs you to handle the possibility that the element might not exist (i.e., undefined or null).

async function apiJoke() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });      
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }      
    const data = await response.json();     
    return data.joke;
  } catch (error) {
    console.error('There was a problem fetching the joke:', error);
  }
}

//if (quoteElement) ensures that you only access textContent if quoteElement is not null. 
//This prevents any runtime errors if the element is missing from the DOM.

async function loadFirstJoke() {
  const firstJoke= await apiJoke();
  if (quoteElement) {
    quoteElement.textContent = firstJoke;
  } else {
    console.error("quoteElement is null")
  }
}

//if (jokeElement && quoteElement) ensures that you only access textContent if quoteElement is not null. 
//This prevents any runtime errors if the element is missing from the DOM.

if(jokeElement && quoteElement) {
  loadFirstJoke();
  jokeElement.addEventListener("click", async () => {
    const joke= await apiJoke();    
    quoteElement.textContent = joke;
  })
}



  
    
