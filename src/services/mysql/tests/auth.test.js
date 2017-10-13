const test = require('ava')
const { connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

const create = () => users.save('user@test.com', '123456')

test('Login de usuário', async t => {
  await create()
  const result = await auth.authenticate('user@test.com', '123456')
  t.not(result.token, null)
  t.not(result.token.length, 0)
})
