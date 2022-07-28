'use strict'
const grande = document.querySelector('.grande');
const punto = document.querySelectorAll('.punto');

punto.forEach((cadaPunto, i) => {
    punto[i].addEventListener('click',() =>{
        let posicion = i
        let operacion = posicion * -50
        
        grande.style.transform = `translateX(${ operacion }%)`
        
        punto.forEach((cadaPunto, i) => {
            
            punto[i].classList.remove('activo')
        })

        punto[i].classList.add('activo')
    });

});


let input = document.getElementsByClassName('formulario-input');
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('keyup', function(){
        if(this.value.length >=1){
            this.nextElementSibling.classList.add('fijar');
        }else {
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}

Swal.fire(
    'Sos mayor de edad?',
    'Esta pagina contiene material violento',
    'warning'
) 


