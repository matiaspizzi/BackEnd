const { promises: fs } = require('fs')

class ContenedorMsjs{
    constructor(ruta){
        this.ruta = ruta;
    }

    async getAll(){
        try {
            const objs = await fs.readFile(this.ruta = ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }    
    }
    
    async getById(id){
        const objs = await this.getAll()
        const found = objs.find(o => o.id == id)
        return found
    }
    
    async save(obj){
        const objs = await this.getAll()
        
        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta = ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    

    async deleteById(id){
        const objs = await this.getAll()
        const found = objs.find(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(found, 1)

        try {
            await fs.writeFile(this.ruta = ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll(){
        try{
            await fs.writeFile(this.ruta = ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

module.exports = ContenedorMsjs