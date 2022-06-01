class MensajesDto {
    constructor(elem, newId){
        this.id = newId
        this.autor = elem.autor
        this.texto = elem.texto
        this.timestamp = new Date().toLocaleString()
    }
}

module.exports = MensajesDto