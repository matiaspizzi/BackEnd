const fs = require('fs')

class ContenedorProductos {
    constructor() {
        this.ruta = './data/productos.json'
    }

    getById(id) {
        const objs = this.getAll()
        const found = objs.find(o => o.id == id)
        return found || { error: `elemento no encontrado` }
    }

    getAll(){
        try{
            const objs = fs.readFileSync(this.ruta, 'utf-8')
            return JSON.parse(objs)
        }
        catch (err) {
            return []
        }
    }

    save(obj){
        const objs = this.getAll()
        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }
        const newObj = { ...obj, timestamp: Date.now(), id: newId }
        objs.push(newObj)

        fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2))
        return newObj
    }

    update(elem, id) {
        const objs = this.getAll()
        const newElem = { id: Number(id), ...elem }
        const index = objs.findIndex(p => p.id == id)
        if (index !== -1) {
            objs[index] = newElem
            fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2))
            return newElem
        } else {
            return { error: `elemento no encontrado` }
        }
    }

    deleteById(id){
        const objs = this.getAll()
        const found = objs.find(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }
        objs.splice(found, 1)
        fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2))
    }

    deleteAll(){
        fs.writeFileSync(this.ruta, JSON.stringify([], null, 2))
    }
}

module.exports = ContenedorProductos