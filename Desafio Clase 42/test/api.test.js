const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const generador = require('./productos.generador.js')

describe('TEST API PRODUCTOS', () => {
    describe('GET', () => {
        it('Obtiene todos los productos', async () => {
            const response = await request.get('/api/productos');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });
    describe('POST', () => {
        it('Guarda un producto', async () => {
            const producto = generador.getProducto()
            const res = await request.post('/api/productos').send(producto);
            expect(res.status).to.equal(200);
            //Verifica que el producto se guarde correctamente
            const responseProduct = res.body[res.body.length-1]
            expect(responseProduct).to.include.keys('id', 'title', 'price', 'thumbnail');
            expect(responseProduct.title).to.equal(producto.title);
            expect(responseProduct.price).to.equal(producto.price);
            expect(responseProduct.thumbnail).to.equal(producto.thumbnail);
        });
    });
    describe('GET', () => {
        it('Obtiene producto por ID', async () => {
            const producto = generador.getProducto()
            const res = await request.post('/api/productos').send(producto);
            expect(res.status).to.equal(200);
            //Verifica que el producto se guarde correctamente
            const responseProduct = res.body[res.body.length-1]
            expect(responseProduct).to.include.keys('id', 'title', 'price', 'thumbnail');
            expect(responseProduct.title).to.equal(producto.title);
            expect(responseProduct.price).to.equal(producto.price);
            expect(responseProduct.thumbnail).to.equal(producto.thumbnail);
            //Busca el producto por id
            const responseById = await request.get(`/api/productos/${responseProduct.id}`);
            // Verifica que el producto se encuentre en la base de datos y que los datos sean correctos
            expect(responseById.status).to.equal(200);
            const responseProductById = res.body[0]
            expect(responseProductById).to.include.keys('id', 'title', 'price', 'thumbnail');
        });
    });
    describe('PUT', () => {
        it('Actualiza producto por ID', async () => {
            const producto = generador.getProducto()
            const res = await request.post('/api/productos').send(producto);
            expect(res.status).to.equal(200);
            //Verifica que el producto se guarde correctamente
            const responseProduct = res.body[res.body.length-1]
            expect(responseProduct).to.include.keys('id', 'title', 'price', 'thumbnail');
            expect(responseProduct.title).to.equal(producto.title);
            expect(responseProduct.price).to.equal(producto.price);
            expect(responseProduct.thumbnail).to.equal(producto.thumbnail);
            //Busca el producto por id
            const update = {title: 'title update', price: '300', thumbnail: 'thumbnail update'}
            const responseUpdate = await request.put(`/api/productos/${responseProduct.id}`).send(update);
            const productUpdated = responseUpdate.body
            // Verifica que el producto se encuentre en la base de datos y que los datos sean correctos
            expect(productUpdated).to.include.keys('id', 'title', 'price', 'thumbnail');
            expect(productUpdated.title).to.equal(update.title);
            expect(productUpdated.price).to.equal(update.price);
            expect(productUpdated.thumbnail).to.equal(update.thumbnail);
        });
    });
    describe('DELETE', () => {
        it('Borra producto por ID', async () => {
            const producto = generador.getProducto()
            const res = await request.post('/api/productos').send(producto);
            expect(res.status).to.equal(200);
            //Verifica que el producto se guarde correctamente
            const responseProduct = res.body[res.body.length-1]
            expect(responseProduct).to.include.keys('id', 'title', 'price', 'thumbnail');
            expect(responseProduct.title).to.equal(producto.title);
            expect(responseProduct.price).to.equal(producto.price);
            expect(responseProduct.thumbnail).to.equal(producto.thumbnail);
            //Borra el producto por id
            const responseDeleted = await request.delete(`/api/productos/${responseProduct.id}`);
            expect(responseDeleted.status).to.equal(200);
        });
    });
});
