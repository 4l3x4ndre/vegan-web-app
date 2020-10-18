/* Handle the input field where we can write all the ingredients that we
* want to be in the recipe. Each tag is made through js and style with css. */

// Get the HTML elements
const tag_container = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');
const label_input_ingredients = document.querySelector('#label_input_ingredients')
const label_input_messages = {
    'empty' : "What are your ingredients?",
    'not-empty' : 'Press enter after each ingredients'
}

// List of all the tags
let tags = [];

function createTag(label) {
    /* Create an HTML element with the name of the ingredient
    * and an icon to close it */
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;

    const closeIcon = document.createElement('i');
    closeIcon.innerHTML = ''
    closeIcon.setAttribute('class', 'far fa-times-circle');
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);

    return div;
}

function clearTags() {
    /* Remove a tag from the list */
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });
}

function addTags() {
    /* Add a tag to the list */
    clearTags();
    tags.slice().reverse().forEach(tag => {
        tag_container.prepend(createTag(tag));
    });
}

function labelInputState(empty) {
    if (empty) {
        label_input_ingredients.innerHTML = label_input_messages['empty']
    } else {
        label_input_ingredients.innerHTML = label_input_messages['not-empty']
    }
}

/* Detect keys event to add a tag and change the label to help the user
* understanding what he needs to do. */
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.target.value.split(',').forEach(tag => {
            tags.push(tag);
        });

        addTags();
        input.value = '';
    }
    if (input.value === "" && tags.length === 0) {
        labelInputState(true)
    } else {
        labelInputState(false)
    }
});

/* Detec clicks event to remove a label if the icon (HTML tag I) was clicked. */
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const tagLabel = e.target.getAttribute('data-item');
        const index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index+1)];
        addTags();
    }
    if (tags.length === 0) {
        labelInputState(true)
    }
})

input.focus();

