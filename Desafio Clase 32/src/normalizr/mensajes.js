const { normalize, schema, } = require('normalizr')

const schemaAutor = new schema.Entity('autor', {}, { idAttribute: 'email' });
const schemaMensaje = new schema.Entity('texto', { author: schemaAutor }, { idAttribute: 'id' })
const schemaMensajes = new schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize({ id: 'mensajes', mensajes: mensajesConId }, schemaMensajes)

module.exports = { normalizarMensajes }