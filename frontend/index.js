document.querySelector('#searchquery').addEventListener("click", interaction)

function _fetchAvailable() {
    /* Checking the existence of fetch() on the client */
    return window.fetch
}

function _getValueFromInputField() {
    /* Get the input from the input field. Use it later in the url */
    let v = document.querySelector("#inputquery").value
    return v
}

async function _fromUrl(_url, _function) {
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

function _widgetRecipe(recipe) {
    /*Return a widget of the recipe to display*/

    let container = document.createElement('div')

    let title = document.createElement('P')
    title.innerHTML = recipe['title']
    container.appendChild(title)

    if (recipe['image'] !== undefined && recipe['image'] != null && recipe['image'] !== '') {
        let img = document.createElement('img')
        img.src = recipe['image']
        img.style.width = '25vw'
        container.appendChild(img)
    }
    return container
}

function _showRecipe(json) {
    /*Put html elements to show the recipe according to the json of the recipe*/

    // access to the recipe itself
    let recipe = json['recipes'][0]

    // get the container in which the recipe will appear
    let container = document.querySelector("#leftcontent")

    // clear the container to ensure only one recipe is printed
    container.innerHTML = ''

    // add the recipe to the html
    container.appendChild(_widgetRecipe(recipe))
    console.log(recipe)
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

