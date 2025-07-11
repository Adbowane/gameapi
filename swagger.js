const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "Gamme Collection API",
        description: "Description"
    },
    host: "localhost:3000",
    schemes: ['http']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc)

// ...
swaggerAutogen(outputFile, endpointsFiles, doc).then( () => {
    require('./server.js')  
})