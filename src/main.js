$(document).ready(() => {

    let carritoCompras = [];
    
    const tarjetaProducto = (titulo, imgs, precio, description, id) => {
        let html = `
        <div class="row g-0" >
            <div class="col-md-4 mx-auto my-auto">
                <img src="${imgs}" alt="..." class="img-fluid p-1">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title" id="titulo">${titulo}</h5>
                <p class="card-text" id="descripcion">${description}</p>
                
                    <hr/>                    
                    <div class="d-flex flex-row justify-content-end">
                        <p class="card-text text-end mx-1" id='precio'><strong>$ ${precio}</strong></p>
                        <button class='btn btn-primary mx-2' id='${id}'>Agregar</button>
                    </div>
                
            </div>
            </div>
        </div> 
        `;
        let card = document.createElement('div');
        $(card).html(html);
        $(card).addClass('card col-sm-10 col-md-5 m-1');
        $(card).attr('id', id);
        // $(card).click(function () {
        //     console.log($(this).find('#titulo').text());

        //     var nombre = $(this).find('#titulo').text();
        //     var precio = $(this).find('#precio').text();
        //     var shorName = nombre.substring(0, 15);
        //     carritoCompras.push(nombre)
        //     agregarCarrito(shorName, precio);
        //     console.log(carritoCompras);
        // });
        
        return card;
    }

    var dataResult = null;

    // fecth api publica
    $.ajax({
        type: 'GET',
        url: 'https://fakestoreapi.com/products',
        dataType: 'json'
    }).done((data) => {
        dataResult = data;
        mostrarProductos();

    });

    const mostrarProductos = () => {
        $("#productos").empty();
        dataResult.map(producto => {
            $("#productos").append(
                tarjetaProducto(
                    producto.title,
                    producto.image,
                    producto.price,
                    producto.description,
                    producto.id
                )
            );
        });
    }

    
    $("#ordenarPrecio").click(() => {
        dataResult.sort((a, b) => {
            if (a.price > b.price) {
                return 1
            } else {
                return -1
            }
        });
        mostrarProductos();
    })

    const agregarCarrito = (nombre, precio) => {
        let liElement = document.createElement('li');
 
        let html = `<a class="dropdown-item d-flex justify-content-between" href="#">${nombre}<p class="">${precio}</p></a>`;

        $(liElement).html(html);
        $("#carrito").append(liElement);
    };

    $("#borrarCarrito").click(()=>{
        $("#carrito").empty();
    });

    $("#pagarCarrito").click(()=>{
        // guardar los id en el carro
    });

    

    const productos = document.getElementById('productos');

    productos.addEventListener('click', e => {
        addProducto(e)
    });
    
    const addProducto = (e) => {
        if (e.target.classList.contains('btn-primary')) {
            setCarro(e.target.parentElement.parentElement);
        }

        e.stopPropagation();
    };

    const setCarro = (objeto) => {
        const producto = {
            id: objeto.querySelector('.btn-primary').id
        }

        agregarCarrito(objeto.querySelector('h5').textContent, objeto.querySelector('#precio').textContent)
        
        // localStorage.setItem(`${producto.id}`, JSON.stringify(producto));
    };


    // validaciones de registro
    $("#registro-form").validate({
        rules: {
            nombre: "required",
            apellido: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                password: true
            }
        },
        messages: {

            nombre: {
                required: "Tienes que ingresar un nombre de al menos 3 caracteres"
            },
            apellido: {
                required: "Tienes que ingresar tus apellidos"
            },
            email: {
                required: "Por favor ingresa una dirreción de correo valida",
                email: "Ingresa un correo valido"
            },
            password: {
                required: 'Por favor ingresa una contraseña'
            }
        },
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
    })



})
