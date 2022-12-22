import { compareAsc, format } from "date-fns"
import "./style.css"

const projectsList = document.getElementById("projects-list")
const todoPanel = document.getElementById("todo-panel")

class Project {
  constructor(name, todos = []) {
    this.name = name
    this.todos = todos
  }
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }
}

const projects = []

const addProject = (project) => {
  projects.push(project)
}

const addTodo = (project, todo) => {
  project.todos.push(todo)
}

const removeTodo = (project, todo) => {
  project.todos.splice(project.todos.indexOf(todo), 1)
}

const removeProject = (project) => {
  projects.splice(projects.indexOf(project), 1)
}

const renderProjectsDOM = () => {}

const renderTodosDOM = (project) => {}

const renderTodoPanel = (project, todo) => {}

const renderProjectPanel = (project) => {}

const renderNewProjectForm = () => {}

const renderNewTodoForm = (project) => {}

const renderEditTodoForm = (project, todo) => {}

const renderEditProjectForm = (project) => {}

const renderProject = (project) => {}

const renderTodo = (project, todo) => {}

const render = () => {}

const init = () => {}

iwindow.onload = () => nit()

//DOM interaction
const addProjectButton = document.getElementById("btn-new-project")
