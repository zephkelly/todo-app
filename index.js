//import { compareAsc, format } from "date-fns"
//import {} from "./style.css"

const projects = []

class Project {
  constructor(name, description, theme = []) {
    this.name = name
    this.description = description
    this.theme = theme
    this.todos = []
  }

  addTodo(newTodo) {
    this.todos.push(newTodo)
  }

  getTodos() {
    return this.todos
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

const todoPanel = document.getElementById("todo-panel")

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

//DOM interaction
const backgroundDarken = document.querySelector(".background-darken")

backgroundDarken.addEventListener("click", () => {
  if (addProjectPanelOpen) {
    closeCreateProjectPanel()
    clearCreateProjectForm()
  }
})

//Project panel ----------------------------------------------------------------
const addProjectButton = document.getElementById("btn-new-project")
const projectsPanel = document.querySelector(".projects-panel")
const projectsList = document.getElementById("projects-list")
const addProjectPanel = document.querySelector(".add-project")
const editProjectsListButton = document.getElementById("projects-edit-btn")

//Create project panel
let addProjectPanelOpen = false
const createProjectButton = document.getElementById("add-project-submit")
const projectNameInput = document.getElementById("input-project-name")
const projectDescriptionInput = document.getElementById("input-project-description")

let themeSelection = ""
const themeSelectionButtons = document.querySelectorAll(".color-selector")

addProjectButton.addEventListener("click", () => {
  clearCreateProjectForm()

  if (addProjectPanelOpen) {
    closeCreateProjectPanel()
  } else {
    openCreateProjectPanel()
  }
})

editProjectsListButton.addEventListener("click", () => {
})

createProjectButton.addEventListener("click", () => {
  const projectName = projectNameInput.value
  const projectDescription = projectDescriptionInput.value
  const theme = themeSelection

  const canCreateProject = validateNewProjectInput(projectName, projectDescription, theme)
  if (canCreateProject == false) return

  createNewProject(projectName, projectDescription, theme)
  clearCreateProjectForm()
  closeCreateProjectPanel()

  renderProjectsList()
})

themeSelectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    themeSelectionButtons.forEach((button) => {
      button.classList.remove("theme-selected")
    })
    button.classList.add("theme-selected")
    themeSelection = button.id
  })
})

function openCreateProjectPanel() {
  addProjectPanelOpen = true

  projectsPanel.style.zIndex = 1
  backgroundDarken.style.width = "100vw"
  backgroundDarken.style.opacity = "0.8"
  addProjectPanel.classList.remove("hidden")
}

function closeCreateProjectPanel() {
  addProjectPanelOpen = false

  delay(300).then(() => {
      ;(projectsPanel.style.zIndex = 0), (backgroundDarken.style.width = "0vw")
  })
  
  backgroundDarken.style.opacity = "0"
  addProjectPanel.classList.add("hidden")
}

function createNewProject(name, description, theme) {
  const newProject = new Project(name, description, theme)
  addProject(newProject)
}

function validateNewProjectInput(projectName, projectDescription, theme) {
  if (projectName === "") {
    alert("Please enter a project name")
    return false
  }
  else if (projectName.length > 20) {
    alert("Project name too long")
    return false
  }
  else if(projectDescription.length > 80) {
    alert("Project description too long")
    return false
  }
  else if (theme === "") {
    alert("Please select a theme")
    return false
  }

  return true
}

function clearCreateProjectForm() {
  projectNameInput.value = ""
  projectDescriptionInput.value = ""
  themeSelection = ""

  themeSelectionButtons.forEach((button) => {
    button.classList.remove("theme-selected")
  })
}

function renderProjectsList() {
  projectsList.innerHTML = ""

  projects.length > 0 ? editProjectsListButton.style.display = "block" : editProjectsListButton.style.display = "none"

  projects.forEach((project) => {
    const projectItem = document.createElement("div")
    projectItem.classList.add("project-list-item")
    projectItem.id = project.name + '_project'

    const projectItemName = document.createElement("h3")
    projectItemName.textContent = project.name

    const projectItemDescription = document.createElement("p")
    projectItemDescription.textContent = project.description

    projectItem.appendChild(projectItemName)
    projectItem.appendChild(projectItemDescription)
    projectsList.appendChild(projectItem)
  })
}

//Project panel ----------------------------------------------------------------


function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

window.onload = () => {
  //get projects
  //render projects list

  editProjectsListButton.style.display = "none"
}