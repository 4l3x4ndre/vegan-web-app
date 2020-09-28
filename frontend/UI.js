document.getElementById('lightdark').onclick = changeThemeUI;

function changeThemeUI() {
    element = document.body
    if (element.className == 'lighttheme') {
        element.className = 'darktheme'
    } else {
        element.className = 'lighttheme'
    }
}