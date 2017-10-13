const jwt = require('jsonwebtoken')

const jwtMiddleware = (deps) => {
  // Next garante a continuidade da requisição
  return async (req, res, next) => {
    if (!deps.exclusions.includes(req.href())) {
      const token = req.headers['x-access-token']

      if (!token) {
        res.send(403, { error: 'Token não fornecido' })
        return false
      }
      
      try {
        // Logo req de todas as rotas terão os dados decodificados vindos do token
        req.decoded = jwt.verify(token, process.env.JWT_SECRET)
      } catch (error) {
        res.send(403, { error: 'Falha ao autenticar o token' })
        return false
      }
    }
    next()
  }
}

module.exports = jwtMiddleware
