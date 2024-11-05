//Menu hamburguesa
let menu = document.getElementById('menu');
let favoriteButton = document.querySelectorAll('.favoriteButton')

function abrirMenu(){
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

//Favoritos
favoriteButton.forEach(button => {
    button.addEventListener('click', function(){
        const icon = this.querySelector('.favoriteIcon');
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            icon.style.color = '#FFD43B';
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            icon.style.color = '#fff';
        }
    })    
});