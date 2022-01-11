

const fs = require('fs');
const { threadId } = require('worker_threads');

class Contenedor{
    constructor(nombre){
        this.nombre = nombre;
    }

    async save(obj){
        const found = arrayObj.find(e => e == obj);
        if(found){
            const id = arrayObj.indexOf(obj) + 1;
            return console.log(`save: Obj YA DENTRO, ID: ${id}`)
        } else {
            arrayObj.push(obj);
            const id = arrayObj.indexOf(obj) + 1;
            obj.id = id;
            const txtInput = JSON.stringify(arrayObj, null, 2);
            console.log(`save: ${id}`)
            await fs.promises.writeFile(`./productos/${this.nombre}.txt`, `${txtInput}`, "utf-8", (error) => {
                if (error) {
                    return console.log("save: ERROR");
                }
            })
            return id;
        }
    }

    getAll(){
        fs.promises.readFile(`./productos/${this.nombre}.txt`, "utf-8")
        .then(contenido => {
            const txtOutput = JSON.parse(contenido);
            console.log(txtOutput);
            return txtOutput;
        })
        .catch(err =>{
            console.log(`getAll: ERROR DE LECTURA ${err}`);
            return null;
        })      
             
    }
    
    async getById(id){
        fs.promises.readFile(`./productos/${this.nombre}.txt`, "utf-8")
        .then(contenido => {
            const txtOutput = JSON.parse(contenido);
            const found = txtOutput.find(e => e.id == id);
            if(found){
                console.log(`getById: OBJETO ENCONTRADO =`);
                console.log(found);
                return found;
            } else {
                console.log(`getById: OBJETO NO ENCONTRADO`)
                return null;
            }
        })
        .catch(err =>{
            console.log(`getById: ERROR DE LECTURA ${err}`);
        }) 
    }

    async deleteById(id){
        fs.promises.readFile(`./productos/${this.nombre}.txt`, "utf-8")
        .then(contenido => {
            const txtOutput = JSON.parse(contenido);
            const found = txtOutput.find(e => e.id == id);
            const txtInput = JSON.stringify(txtOutput.filter(e => e !== found), null, 2);
            fs.promises.writeFile(`./productos/${this.nombre}.txt`, `${txtInput}`, "utf-8", (error) => {
                if (error) {
                    return console.log("deleteById: ERROR");
                }
            })
            return txtInput;
        })
        .catch(err =>{
            console.log(`deleteById: ERROR DE LECTURA ${err}`);
        }) 
    }

    deleteAll(){
        fs.promises.writeFile(`./productos/${this.nombre}.txt`, ` `, "utf-8", (error) => {
            if (error) {
                console.log("deleteAll: ERROR");
            }
        });
    }
}


const Productos = new Contenedor("Productos");


const prueba = Productos.getAll()
console.log("PRUEBA------------------------")
console.log(prueba)

const arrayObj = []



const obj1 = {
    title: "Producto1",
    price: 123,
    thumbnail: "xxx"
}

const obj2 = {
    title: "Producto2",
    price: 123,
    thumbnail: "xxx"
}

const obj3 = {
    title: "Producto3",
    price: 123,
    thumbnail: "xxx"
}

const obj4 = {
    title: "Producto4",
    price: 123,
    thumbnail: "xxx"
}

const obj5 = {
    title: "Producto5",
    price: 123,
    thumbnail: "xxx"
}

const obj6 = {
    title: "Producto6",
    price: 123,
    thumbnail: "xxx"
}

// Productos.save(obj1)
// Productos.save(obj2)
// Productos.save(obj3)
// Productos.save(obj4)
// Productos.save(obj4)
// Productos.save(obj5)
// Productos.save(obj6)

// Productos.getAll()
// Productos.getById(13)
// Productos.deleteById(3)
// Productos.deleteAll()






