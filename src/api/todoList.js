import axios from 'axios'
export function getToDoList () {
  return axios.get('/todolist')
}
