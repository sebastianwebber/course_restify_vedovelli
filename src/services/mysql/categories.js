/* 
  deps - São as dependências adicionadas no segundo parâmetro
  em mysql/index para esse módulo
*/
const categories = deps => {
  /* 
    Promise do es2015 - para execuções assíncronas
    Quando executamos uma promessa, sabemos que algo
    será retornado no futuro, logo podemos pegar esse retorno
    com then, caso sucesso, ou catch caso houver um erro

    Await: determina que a execução seja pausada, até
    que alguma coisa aconteça (Promise resolvida)
  */
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM categories', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as categorias', reject)
            return false
          }
          resolve({ categories: results })
        })
      })
    },
    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('INSERT INTO categories (name) VALUES (?)', [name], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a categoria ${name}`, reject)
            return false
          }
          // insertId vem da biblioteca mysql para pegar o id dos dados inseridos
          resolve({ category: { name, id: results.insertId } })
        })
      })
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (error, results) => {
          // Results retorna: fieldCount, affectedRows,insertId,serverStatus,warningCount,message,protocol41,changedRows
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
            return false
          }
          // { name, id } em es2015 é o mesmo que { name:name, id:id } es5
          resolve({ category: { name, id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM categories WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a categoria de id ${id}`, reject)
            return false
          }
          // insertId vem da biblioteca mysql para pegar o id dos dados inseridos
          resolve({ message: 'Cateogria removida com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = categories
