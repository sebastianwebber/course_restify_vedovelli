// Módulo que carrega as variáveis de ambiente do arquivo .env
require('dotenv').config()

const server = require('./server/index')

server.listen('3456')
