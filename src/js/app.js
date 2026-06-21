import '../scss/app.scss'

document.addEventListener('DOMContentLoaded', function(){
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    window.addEventListener('scroll', function() {
        if( sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16
    const galeria = document.querySelector('.galeria-imagenes')

    //chatGPT
    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const img = document.createElement('picture');

        img.innerHTML = `
            <source srcset="img/gallery/thumb/avif/${i}.avif" type="image/avif">
            <source srcset="img/gallery/thumb/content/webp/${i}.webp" type="image/webp">
            <img width="300" height="200" loading="lazy" src="img/gallery/thumb/jpg/${i}.jpg" alt="sobre festival">
        `;

        //Event handler
        img.addEventListener('click', () => {
            mostrarImagen(i);
        });
        //fin event handler

        galeria.appendChild(img);
    }
// fin de chatGPT
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    
    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500); 
}

function mostrarImagen(i) {
    const img = document.createElement('picture');
    img.innerHTML = `
            <source srcset="img/gallery/full/avif/${i}.avif" type="image/avif">
            <source srcset="img/gallery/full/content/webp/${i}.webp" type="image/webp">
            <img width="300" height="200" loading="lazy" src="img/gallery/full/jpg/${i}.jpg" alt="sobre festival">
        `;

    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal


    //boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(img)
    modal.appendChild(cerrarModalBtn)

    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')


        let actual = ''
        sections.forEach( section=> {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if(window.scrollY >= ( sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')
    navLinks.forEach( link => {
        link.addEventListener( 'click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll) 

            section.scrollIntoView({behavior: 'smooth'})
        }) 
    })
}