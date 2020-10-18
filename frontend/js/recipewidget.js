function _transparency(element, value, time_s) {
    /* change the opacity of an element
    * May be improve in the future with animation */

    return new Promise(resolve => {
        // Changing the opacity
        element.style.opacity = value

        // After the delay (i.e. the opacity transition, return that the animation is done
        setTimeout(function () {resolve(true)}, time_s * 1000)
    })
}

function _widgetRecipe(recipe) {
    /*Return a widget of the recipe to display*/

    // create the container
    let container = document.createElement('div')
    container.className = 'widget'

    // Recipe title
    let title = document.createElement('P')
    title.className = 'title'
    title.innerHTML = recipe['title']
    container.appendChild(title)

    // Recipe image
    if (recipe['image'] !== undefined && recipe['image'] != null && recipe['image'] !== '') {
        let img = document.createElement('img')
        img.src = recipe['image']
        img.style.width = '25vw'
        container.appendChild(img)
    }

    return container
}

async function _showRecipe(json) {
    /*Put html elements to show the recipe according to the json of the recipe*/

    // get the container in which the recipe will appear
    let container = document.querySelector('#leftcontent')
    container.style.opacity = '0'

    // remove the background image
    let page_image_container = document.querySelector('#leftpage-cont')
    // let _t = await _transparency(page_image_container, 0, 0)

    // access to the recipe itself
    let recipe = json['recipes'][0]
    // clear the container to ensure only one recipe is printed
    container.innerHTML = ''

    // add the recipe to the html and show it
    container.style.opacity = '1'
    container.appendChild(_widgetRecipe(recipe))
    console.log(recipe)

}
