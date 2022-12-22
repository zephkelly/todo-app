//import { compareAsc, format } from "date-fns"
//import "./style.css"

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

//DOM interaction
const backgroundDarken = document.querySelector(".background-darken")
//Project panel
const addProjectButton = document.getElementById("btn-new-project")
const projectsPanel = document.querySelector(".projects-panel")
const addProjectPanel = document.querySelector(".add-project")

let addProjectPanelOpen = false

addProjectButton.addEventListener("click", () => {
  addProjectPanelOpen = !addProjectPanelOpen

  if (addProjectPanelOpen) {
    console.log("hello")
    projectsPanel.style.zIndex = 1
    backgroundDarken.classList.remove("hidden")
    addProjectPanel.classList.remove("hidden")
  } else {
    console.log("world")
    projectsPanel.style.zIndex = 0
    backgroundDarken.classList.add("hidden")
    addProjectPanel.classList.add("hidden")
  }
})
