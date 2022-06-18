const { buildSchema } = require('graphql')

const graphQlProductoSchema = buildSchema(`
    type Producto {
        id: ID!
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    input ProductoInput {
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    input ProductoInputUpdate {
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        getProducto(id: ID!): Producto,
        getProductos: [Producto]
    }
    type Mutation {
        saveProducto(datos: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto,
        updateProducto(id: ID!, datos: ProductoInputUpdate): Producto
    }`
)

module.exports = {graphQlProductoSchema};