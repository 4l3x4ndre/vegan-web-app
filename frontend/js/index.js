document.querySelector('#searchquery').addEventListener("click", interaction)
document.querySelector('#searchrandom').addEventListener("click", interaction)

function _fetchAvailable() {
    /* Checking the existence of fetch() on the client */
    return window.fetch
}

function _getValueFromInputField() {
    /* Get the input from the input field. Use it later in the url */
    let v = document.querySelector("#input_ingredients  ").value
    return v
}

async function _fromUrl(_url, _function) {
    /* Get the data from the url and pass it to the function */
    fetch(_url)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function(json) {
                    _function(json)
                });
            } else {
                console.log('error')
            }
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })
}

function getRecipeFromIngredients() {
    /*Fetch from a mix of ingredients [WIP]*/
    let response = interaction('https://api.spoonacular.com/recipes/716429/information?apiKey=' + APIKEY + '&includeNutrition=true.')
    console.log(response)
}

async function getRandomRecipe() {
    /*Fetch a random recipe and show it*/
    let response = await interaction('https://api.spoonacular.com/recipes/random?apiKey=' + APIKEY + '&number=1&tags=vegan')
}


async function interaction(_url) {
    /* Interaction from the user
    If fetch does not exist on the client, we can not continue */
    if (!_fetchAvailable()) {
        return null
    }
    
    let v = _getValueFromInputField()
    console.log("Your ingredients are: " + v)

    // Get the response with the url
    return await _fromUrl(_url, _showRecipe)
}

