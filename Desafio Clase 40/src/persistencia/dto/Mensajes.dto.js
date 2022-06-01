class MensajesDto {
    constructor(datos){
        this.id = datos.id
        this.autor = datos.autor
        this.texto = datos.texto
        this.timestamp = new Date().toLocaleString()
    }
}