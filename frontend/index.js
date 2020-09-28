document.querySelector('#searchquery').addEventListener("click", interaction)

function _fetchAvailable() {
    // Checking the existence of fetch() on the client
    return window.fetch
}

function _getValueFromInputField() {
    // Get the input from the input field
    // Use it later in the url
    let v = document.querySelector("#inputquery").value
    return v
}

async function _fromUrl(_url, _function) {
    fetch(_url)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function(json) {
                    _function(null, json)
                });
            } else {
                console.log('error')
            }
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        })
}

function _showRecipe(element, json) {
    console.log(json['recipes'][0])
}

function getRecipeFromIngredients() {
    let response = interaction('https://api.spoonacular.com/recipes/716429/information?apiKey=' + APIKEY + '&includeNutrition=true.')
    console.log(response)
}

async function getRandomRecipe() {
    let response = await interaction('https://api.spoonacular.com/recipes/random?apiKey=' + APIKEY + '&number=1&tags=vegan')
}


async function interaction(_url) {
    // Interaction from the user
    // If fetch does not exist on the client, we can not continue
    if (!_fetchAvailable()) {
        return null
    }
    
    let v = _getValueFromInputField()
    console.log("Your ingredients are: " + v)

    // Get the response with the url
    return await _fromUrl(_url, _showRecipe)
}

