const paneles = document.querySelectorAll('.car');

paneles.forEach((panel) => {
    panel.addEventListener('click', () => {
        removerClaseActiva()
        panel.classList.add('activa');
    });
});

function removerClaseActiva() {
    paneles.forEach((panel) => {
        panel.classList.remove('activa');
    });
}