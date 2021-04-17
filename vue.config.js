const data = require('./src/mock/todoList.json')
module.exports = {
  devServer: {
    before (app) {
      app.get('/todolist', (req, res) => {
        res.send(data)
      })
    }
  }
}
