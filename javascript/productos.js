const baseDeDatos = [
    {
        id: 1,
        nombre: 'Resident Evil 1',
        precio: 1200,
        imagen: './playstation/re1.jpg'
    },
    {
        id: 2,
        nombre: 'Resident Evil 2',
        precio: 5400,
        imagen: './playstation/re2.jpg'
    },
    {
        id: 3,
        nombre: 'Resident Evil 3',
        precio: 6000,
        imagen: './playstation/re3.jpg'
    },
    {
        id: 4,
        nombre: 'Resident Evil 4',
        precio: 1200,
        imagen: './playstation/re4.jpg',
    },
    {
        id: 5,
        nombre: 'Resident Evil 5',
        precio: 2200,
        imagen: './playstation/re5.jpg',
    },
    {
        id: 6,
        nombre: 'Resident Evil 6',
        precio: 1500,
        imagen: './playstation/re6.jpg',
    },
    {
        id: 7,
        nombre: 'Resident Evil 7',
        precio: 3500,
        imagen: './playstation/re7.jpg',
    },
    {
        id: 8,
        nombre: 'Resident Evil 8',
        precio: 12000,
        imagen: './playstation/re8.jpg',
    },

];

let carrito = [];
            const divisa = '$';
            const DOMitems = document.querySelector('#items');
            const DOMcarrito = document.querySelector('#carrito');
            const DOMtotal = document.querySelector('#total');
            const DOMbotonVaciar = document.querySelector('#boton-vaciar');
            const DOMbotonEnviar = document.querySelector('#boton-enviar');
            const miLocalStorage = window.localStorage;

            // Funciones

            function renderizarProductos() {
                baseDeDatos.forEach((info) => {
                    // Estructura
                    const miNodo = document.createElement('div');
                    miNodo.classList.add('card', 'col-sm-4');
                    // Body
                    const miNodoCardBody = document.createElement('div');
                    miNodoCardBody.classList.add('card-body');
                    // Titulo
                    const miNodoTitle = document.createElement('h5');
                    miNodoTitle.classList.add('card-title');
                    miNodoTitle.textContent = info.nombre;
                    // Imagen
                    const miNodoImagen = document.createElement('img');
                    miNodoImagen.classList.add('img-fluid');
                    miNodoImagen.setAttribute('src', info.imagen);
                    // Precio
                    const miNodoPrecio = document.createElement('p');
                    miNodoPrecio.classList.add('card-text');
                    miNodoPrecio.textContent = `${info.precio}${divisa}`;
                    // Boton 
                    const miNodoBoton = document.createElement('button');
                    miNodoBoton.classList.add('btn', 'btn-primary');
                    miNodoBoton.textContent = '+';
                    miNodoBoton.setAttribute('marcador', info.id);
                    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);

                    miNodoCardBody.appendChild(miNodoImagen);
                    miNodoCardBody.appendChild(miNodoTitle);
                    miNodoCardBody.appendChild(miNodoPrecio);
                    miNodoCardBody.appendChild(miNodoBoton);
                    miNodo.appendChild(miNodoCardBody);
                    DOMitems.appendChild(miNodo);
                });
            }

            function anyadirProductoAlCarrito(evento) {
                carrito.push(evento.target.getAttribute('marcador'))
                renderizarCarrito();
                guardarCarritoEnLocalStorage();
            }

            function renderizarCarrito() {
                DOMcarrito.textContent = '';
                const carritoSinDuplicados = [...new Set(carrito)];
                carritoSinDuplicados.forEach((item) => {
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item);
                    });
                    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    const miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

                    const miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.dataset.item = item;
                    miBoton.addEventListener('click', borrarItemCarrito);
                    miNodo.appendChild(miBoton);
                    DOMcarrito.appendChild(miNodo);
                });

                DOMtotal.textContent = calcularTotal();
            }

            function borrarItemCarrito(evento) {
                const id = evento.target.dataset.item;
                carrito = carrito.filter((carritoId) => {
                    return carritoId !== id;
                });
                renderizarCarrito();
                guardarCarritoEnLocalStorage();

            }

            function calcularTotal() {
                return carrito.reduce((total, item) => {
                    const miItem = baseDeDatos.filter((itemBaseDatos) => {
                        return itemBaseDatos.id === parseInt(item);
                    });
                    return total + miItem[0].precio;
                }, 0).toFixed(2);
            }

            function vaciarCarrito() {
                carrito = [];
                renderizarCarrito();
                localStorage.clear();
            }

            function guardarCarritoEnLocalStorage () {
                miLocalStorage.setItem('carrito', JSON.stringify(carrito));
            }

            function cargarCarritoDeLocalStorage () {
                if (miLocalStorage.getItem('carrito') !== null) {
                    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
                }
            };

            DOMbotonVaciar.addEventListener('click', vaciarCarrito);
            
            DOMbotonEnviar.addEventListener('click', ()=>{
                if (localStorage.getItem('carrito')){
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'La compra fue realizada con exito!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                
                vaciarCarrito();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo anda mal.',
                        text: 'No se han encontrado articulos en el carrito!',
                    });
                }  
                
            });

            cargarCarritoDeLocalStorage();
            renderizarProductos();
            renderizarCarrito();
