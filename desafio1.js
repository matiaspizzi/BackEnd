class Usuario{
    constructor(nombre,apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
    }

    addMascota(a){
        this.mascotas.push(a);
    }

    countMascotas(){
        return(this.mascotas.length);
    }

    addBook(nombre, autor){
        this.libros.push({
            nombre: nombre,
            autor: autor
        })
    }

    getBookNames(){
        const nombres = [];
        this.libros.forEach((elemento) => {
            nombres.push(elemento.nombre);
        })
        return(nombres);
    }
}

const matias = new Usuario("matias", "pizzi");

console.log(matias.getFullName());
matias.addMascota(`Toto`);
matias.addMascota(`Simba`);
console.log(`Cantidad de mascotas: ${matias.countMascotas()}`);
matias.addBook("Cujo","Stephen King");
matias.addBook("Viaje Al Centro De La Tierra","Julio Berne");
matias.addBook("El gran Gatsby","Scott Fitzgerald");
console.log(`Libros: ${matias.getBookNames()}`);
