"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//HTMLElement | null: Tells TypeScript to treat the element as an HTMLElement (if it exists), or null (if it doesn't exist). 
//This type assertion gives you access to HTMLElement-specific properties (like innerHTML, textContent, etc.)
//Also handles cases where the element might not be found.
const jokeElement = document.getElementsByClassName("getJoke")[0];
const quoteElement = document.getElementsByClassName("dadJoke")[0];
//Without type assertion, TypeScript would assign the variable jokeElement the type Element | undefined. 
//This would create issues when trying to access properties specific to an HTMLElement (like innerHTML or addEventListener), 
//because Element doesn't have all the methods and properties that an HTMLElement does. 
//Additionally, TypeScript needs you to handle the possibility that the element might not exist (i.e., undefined or null).
function apiJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data.joke;
        }
        catch (error) {
            console.error('There was a problem fetching the joke:', error);
        }
    });
}
//if (quoteElement) ensures that you only access textContent if quoteElement is not null. 
//This prevents any runtime errors if the element is missing from the DOM.
function loadFirstJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const firstJoke = yield apiJoke();
        if (quoteElement) {
            quoteElement.textContent = firstJoke;
        }
        else {
            console.error("quoteElement is null");
        }
    });
}
//if (jokeElement && quoteElement) ensures that you only access textContent if quoteElement is not null. 
//This prevents any runtime errors if the element is missing from the DOM.
if (jokeElement && quoteElement) {
    loadFirstJoke();
    jokeElement.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const joke = yield apiJoke();
        quoteElement.textContent = joke;
    }));
}
