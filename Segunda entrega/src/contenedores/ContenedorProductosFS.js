const fs = require("fs");

class ContenedorProductosFS {
    constructor(path) {
        this.ruta = path;
    }

    save(obj) {
        const objs = this.getAll();
        let newId;
        if (objs.length == 0) {
            newId = 1;
        } else {
            newId = objs[objs.length - 1].id + 1;
        }
        const newObj = { ...obj, timestamp: Date.now(), id: newId };
        objs.push(newObj);

        fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
        return this.getAll();
    }

    getAll() {
        try {
            const objs = fs.readFileSync(this.ruta, "utf-8");
            return JSON.parse(objs);
        } catch (err) {
            return [];
        }
    }

    getById(id) {
        const objs = this.getAll();
        const found = objs.find((o) => o.id == id);
        return found || { error: `Producto ${id} no encontrado` };
    }

    update(elem, id) {
        const objs = this.getAll();
        const index = objs.findIndex((p) => p.id == id);
        if (index !== -1) {
            if (elem.title) {
                objs[index].title = elem.title;
            }
            if (elem.price) {
                objs[index].price = elem.price;
            }
            if (elem.thumbnail) {
                objs[index].thumbnail = elem.thumbnail;
            }
            fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
            return this.getById(id);
        } else {
            return { error: `Producto ${id} no encontrado` };
        }
    }

    deleteById(id) {
        const objs = this.getAll();
        const index = objs.findIndex((e) => e.id == id);
        if (index == -1) {
            return { error: `Producto ${id} no encontrado` };
        } else {
            objs.splice(index, 1);
            fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
            return this.getAll();
        }
    }

    deleteAll() {
        fs.writeFileSync(this.ruta, JSON.stringify([], null, 2));
        return this.getAll()
    }
}

module.exports = ContenedorProductosFS;
