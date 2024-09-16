let menu = document.getElementById('menu');
abrirMenu();

function abrirMenu(){
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}