

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('update', producto)
    formAgregarProducto.reset()
})

socket.on('productos', async productos => {
    const res = await fetch(`http://localhost:8080/api/productos-test`)
    const prodsMock = await res.json()
    const arrayProd =  prodsMock.concat(productos)
    showProducts(arrayProd).then(html => {
        document.getElementById('listaProductos').innerHTML = html
    })
})

function showProducts(productos) {
    return fetch('../plantillas/historialProductos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla)
            const html = template({ productos })
            return html
        })
}

const inputEmail = document.getElementById('inputEmail')
const inputName = document.getElementById('inputName')
const inputSurname = document.getElementById('inputSurname')
const inputAge = document.getElementById('inputAge')
const inputAlias = document.getElementById('inputAlias')
const inputAvatar = document.getElementById('inputAvatar')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const schemaAutor = new normalizr.schema.Entity('autor', {}, { idAttribute: 'email' });
const schemaMensaje = new normalizr.schema.Entity('texto', { author: schemaAutor }, { idAttribute: 'id' })
const schemaMensajes = new normalizr.schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { 
        autor: {
            id: inputEmail.value,
            nombre: inputName.value,
            apellido: inputSurname.value,
            edad: inputAge.value,
            alias: inputAlias.value,
            avatar: inputAvatar.value
        }, 
        texto: inputMensaje.value  
    }

    socket.emit('nuevoMensaje', mensaje)
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', async mensajesNorm => {

    const mensajesNormLength = JSON.stringify(mensajesNorm).length
    const mensajesDenorm = normalizr.denormalize(mensajesNorm.result, schemaMensajes, mensajesNorm.entities)
    const mensajesDenormLength = JSON.stringify(mensajesDenorm).length
    const reduc = parseInt((mensajesDenormLength * 100) / mensajesNormLength)
    const html = await showMensajes(mensajesDenorm.mensajes)
    document.getElementById('compression').innerHTML = `Compresion: ${100-reduc}%`
    document.getElementById('mensajes').innerHTML = html
})

async function showMensajes(mensajes) {
    return fetch('../plantillas/mensajes.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla)
            console.log(mensajes)
            const html = template({ mensajes: mensajes })
            return html
        })
}

inputEmail.addEventListener('input', () => {
    const hayEmail = inputEmail.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})


