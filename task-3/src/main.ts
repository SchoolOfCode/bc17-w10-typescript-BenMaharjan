
document.getElementsByClassName("getJoke")[0].addEventListener("click", getJoke)

// test function
function test() {
    alert("button clicked");
}

//create a fetch request function

async function getJoke() {
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

      console.log('Joke:', data.joke);
      
    document.getElementsByClassName("dadJoke")[0].innerHTML= data.joke;

    } catch (error) {
      console.error('There was a problem fetching the joke:', error);
    }
  }

  
    
