const axios = require('axios');


let id = 7;

async function getAll() {
    try {
        const response = await axios.get('http://localhost:8080/api/productos');
        console.log("TEST GET ALL");
        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function save() {
    try {

        const response = await axios.post('http://localhost:8080/api/productos', {title: "test title",price: 3000,thumbnail: "test thumbnail"});
        console.log("TEST SAVE");
        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getById() {
    try {
        const response = await axios.get('http://localhost:8080/api/productos/' + id);
        console.log("TEST GET BY ID");
        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function update() {
    try {
        const response = await axios.put('http://localhost:8080/api/productos/' + id, {title: "test title update",price: 3000,thumbnail: "test thumbnail update"});
        console.log("TEST UPDATE");
        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteById() {
    try {
        const response = await axios.delete('http://localhost:8080/api/productos/' + id);
        console.log("TEST DELETE BY ID");
        console.log("producto eliminado");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

save()
    .then(() => {
        getById()
            .then(() => {
                update()
                    .then(() => {
                        deleteById()
                            .then(() => {
                                getAll()
                                    .then(() => {
                                        console.log("TEST OK");
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })

    }
    )