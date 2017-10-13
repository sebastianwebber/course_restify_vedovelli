const restify = require('restify')
const server = restify.createServer()
const routes = require('../http/routes')
const cors = require('./cors')
const jwtMiddleware = require('./jwtMiddleware')

const exclusions = ['/autenticacao']

server.pre(cors.preflight)
server.use(cors.actual)
// Dá acesso as informações passadas no corpo das requisições POST, GET, PUT, DELETE...
server.use(restify.plugins.bodyParser())
server.use(jwtMiddleware({exclusions}))

routes(server)

module.exports = server
