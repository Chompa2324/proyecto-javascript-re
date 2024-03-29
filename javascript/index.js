//Carrusel de Imagenes--------------------------------------------------------------
'use strict'
const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto');

punto.forEach((cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i
        let operacion = posicion * -50

        grande.style.transform = `translateX(${operacion}%)`

        punto.forEach((cadaPunto, i) => {

            punto[i].classList.remove('activo')
        })

        punto[i].classList.add('activo')
    });

});


//Formulario-----------------------------------------------------------------------
let input = document.getElementsByClassName('formulario-input');
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('keyup', function () {
        if (this.value.length >= 1) {
            this.nextElementSibling.classList.add('fijar');
        } else {
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}


//Libreria de Advertencia----------------------------------------------------------
Swal.fire(
    'Advertencia sobre la pagina',
    'Esta pagina contiene material violento',
    'warning'
)


    //AJAX - Fetch de Seccion La Saga---------------------------------------------------------
    const videogames = document.getElementById("videojuegos");

    fetch('./json/videogames.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(elemento => {
                const section = document.createElement('section');
                section.classList.add('about')
                const div = document.createElement('div');
                section.append(div)
                const img = document.createElement('img');
                const parrafo = document.createElement('p');
    
                if (elemento.id % 2 === 0) img.classList.add('imagen-seccion2');
                else img.classList.add('imagen-seccion');
                img.src = elemento.imagen;
                parrafo.classList.add('parrafo-2');
                parrafo.innerText = elemento.descripcion;
    
                div.append(img);
                div.append(parrafo);
    
    
                videogames.append(section);
            });
        })


//AJAX - Fetch Lista de Personajes------------------------------------------------------------
const tbody = document.getElementById("tabla");

fetch('./json/tabla.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(elemento =>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
            
            <th scope="row">${ elemento.id }</th>
                <td>${ elemento.nombre }</td>
                <td>${ elemento.nacionalidad }</td>
                <td>${ elemento.edad }</td>
            
                `;
            
                tabla.append(tr);
        });

    })


//AJAX - Fetch seccion Enemigos en el proyecto-------------------------------------
const history = document.getElementById("history");

fetch('./json/data.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(elemento => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h2>${elemento.nombre} </h2>
            <p>Personaje ${elemento.id} </p>
            <p>${elemento.historia} </p>
            <hr/>
            `;
            history.append(li);
        });
    })


    //Boton que nos lleva hacia arriba-------------------------------------------------
document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp() {
    let currentScroll = document.documentElement.scrollTop;
    if (currentScroll > 0) {

        window.scrollTo(0, 0);
    }
}

let buttonUp = document.getElementById("button-up");
window.onscroll = function () {
    let scroll = document.documentElement.scrollTop;
    if (scroll > 200) {
        buttonUp.style.transform = "scale(1)";
    } else if (scroll < 200) {
        buttonUp.style.transform = "scale(0)";
    }
}


//Iluminacion----------------------------------------------------------------------
const btnSwitch = document.getElementById("switch");

btnSwitch.addEventListener("click", () => {
    document.body.classList.toggle("white");
    btnSwitch.classList.toggle("activo");
});
