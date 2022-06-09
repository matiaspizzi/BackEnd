const IDao = require('../IDao')

let messageMemoryInstance = null;

class MessagesMemoryDAO extends IDao {
    constructor(){
        super()
        this.messages = []
    }

    static getInstance() {
        if (!messageMemoryInstance) {
            messageMemoryInstance = new MessagesMemoryDAO()
        }
        return messageMemoryInstance;
    }

    getAll() {
        return this.messages
    }

    save(data) {
        this.messages.push(data)
        return this.messages[this.messages.length - 1]
    }
    
    getById(id) {
        return this.messages.find(product => product.id === id)
    }

    deleteById(id) {
        return this.messages = this.messages.filter(product => product.id !== id)
    }

    deleteAll() {
        return this.messages = []
    }
}

module.exports = MessagesMemoryDAO;