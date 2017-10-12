
const db = require('../services/mysql')

const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('teste')
    next()
  })
  /*
    Async e Await: possibilita a legibilidade de um
    código assíncrono como se fosse síncrono
  */
  server.get('categoria', async (req, res, next) => {
    try {
      res.send(await db.categories().all())
    } catch (error) {
      res.send(error)
    }
    next()
    /*
      Sem async, await teriamos que trabalhar com promises assim:

      db.categories().all().then(categories => {
        res.send(categories)
        next()
      }).catch(error => {
        res.send(error)
        next()
      })
    */
  })
  server.post('categoria', async (req, res, next) => {
    // es2015 object destructuring
    const { name } = req.params
    try {
      res.send(await db.categories().save(name))
    } catch (error) {
      res.send(error)
    }
    next()
  })
  server.put('categoria', async (req, res, next) => {
    const { id, name } = req.params
    try {
      res.send(await db.categories().update(id, name))
    } catch (error) {
      res.send(error)
    }
    next()
  })
  server.del('categoria', async (req, res, next) => {
    const { id } = req.params
    try {
      res.send(await db.categories().del(id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
