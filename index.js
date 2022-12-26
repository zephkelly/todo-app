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

  getTheme() {
    return this.theme.toString()
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

const removeProject = (project, domProject) => {
  projects.splice(projects.indexOf(project), 1)
  domProjects.splice(domProjects.indexOf(domProject), 1)
}

//DOM interaction
const backgroundDarken = document.querySelector(".background-darken")

backgroundDarken.addEventListener("click", () => {
  if (addProjectPanelOpen) {
    closeCreateProjectPanel()
    clearCreateProjectForm()
  }
})

//Projects list/create panel ----------------------------------------------------------------
const obsidianThemeHex = '#7209b7'
const forestThemeHex = '#0f9960'
const oceanThemeHex = '#3a86ff'
const sunflowerThemeHex = '#f7b731'

const createProjectPanel = document.getElementById("btn-new-project")
const projectsPanel = document.querySelector(".projects-panel")
const projectsList = document.getElementById("projects-list")
const openProjectsPanelButton = document.getElementById("open-projects-panel")
const addProjectPanel = document.querySelector(".add-project")
const editProjectsListButton = document.getElementById("projects-edit-btn")

const projectSection = document.querySelector(".project-section")

let domProjects = [] //DOM representation of projects

//Create project panel
const createProjectButton = document.getElementById("add-project-submit")
const projectNameInput = document.getElementById("input-project-name")
const projectDescriptionInput = document.getElementById("input-project-description")
const cancelProjectAddButton = document.getElementById("cancel-project-create")

let themeSelection = ""
const themeSelectionButtons = document.querySelectorAll(".color-selector")

let addProjectPanelOpen = false
let editingProjects = false

createProjectPanel.addEventListener("click", () => {
  clearCreateProjectForm()

  if (editingProjects) projectListNormalMode()

  if (addProjectPanelOpen) {
    closeCreateProjectPanel()
  } else {
    openCreateProjectPanel()
  }
})

editProjectsListButton.addEventListener("click", () => {
  editingProjects = !editingProjects

  if (addProjectPanelOpen) closeCreateProjectPanel()
  
  domProjects.forEach((project) => {
    if (editingProjects) {
      project.style.marginLeft = "2rem"
      project.firstChild.classList.remove("hidden")
    } else {
      project.style.marginLeft = "0rem"
      project.firstChild.classList.add("hidden")
    } 
  })
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
  addClickEventToProjects()
})

themeSelectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    themeSelectionButtons.forEach((b) => {
      b.classList.remove("theme-selected")
    })
    button.classList.add("theme-selected")
    themeSelection = button.id
  })
})

function addClickEventToProjects() {
  domProjects.forEach((project) => {
    project.addEventListener("click", () => {
      const projectName = project.id.split('_')[0]
      const selectedProject = projects.find((project) => project.name === projectName)

      if (editingProjects) {
        removeProject(selectedProject, project)
        renderProjectsList()
        projectListEditMode()
        addClickEventToProjects()
      } else {
        openProject(selectedProject)
      }
    })
  })
}

function projectListEditMode() {
  editingProjects = true

  domProjects.forEach((project) => {
    project.style.marginLeft = "2rem"
    project.firstChild.classList.remove("hidden")
  })
}

function projectListNormalMode() {
  editingProjects = false

  domProjects.forEach((project) => {
    project.style.marginLeft = "0rem"
    project.firstChild.classList.add("hidden")
  })
}

cancelProjectAddButton.addEventListener("click", () => {
  clearCreateProjectForm()
  closeCreateProjectPanel()
})

let projectsPanelOpen = true
openProjectsPanelButton.addEventListener("click", () => {
  if (projectsPanelOpen) {
    collapseProjectsPanel()
  } else {
    openProjectsPanel()
  }
})

function openProjectsPanel() {
  projectSection.classList.add('project-section-slideright')
  openProjectsPanelButton.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>'

  projectsPanelOpen = true

  delay(200).then(() => {
    projectsPanel.classList.remove("projects-panel-slideout")
  })
}

function collapseProjectsPanel() {
  projectsPanel.classList.add("projects-panel-slideout")
  openProjectsPanelButton.classList.remove("hidden")
  openProjectsPanelButton.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>'

  projectsPanelOpen = false

  delay(100).then(() => {
    projectSection.classList.remove('project-section-slideright')
  })
}

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

    const projectDeleteIcon = document.createElement("span")
    projectDeleteIcon.classList.add("material-symbols-outlined")
    projectDeleteIcon.classList.add('delete-project')
    projectDeleteIcon.classList.add('hidden')
    projectDeleteIcon.textContent = "delete"

    const projectItemName = document.createElement("h3")
    projectItemName.textContent = project.name
    
    const projectItemDescription = document.createElement("p")
    projectItemDescription.textContent = project.description
        
    domProjects.push(projectItem)

    projectItem.appendChild(projectDeleteIcon)
    projectItem.appendChild(projectItemName)
    projectItem.appendChild(projectItemDescription)
    projectsList.appendChild(projectItem)
  })
}

function setThemeColor(theme) {
  switch (theme) {
    case "obsidian":
      return obsidianThemeHex
    case "forest":
      return forestThemeHex
    case "ocean":
      return oceanThemeHex
    case "sunflower":
      return sunflowerThemeHex
  }
}

function openProject(project) {
  document.documentElement.style.setProperty('--accent-color', setThemeColor(project.getTheme()));
  document.getElementById('empty-project-panel').classList.add('hidden')

  delay(100).then(() => {
    collapseProjectsPanel()
  })

  delay(400).then(() => {
    projectSection.classList.remove("hidden")
  })
}
//Projects list/create panel ----------------------------------------------------------------


//Project section ---------------------------------------------------------------------------
//const projectSection = document.querySelector(".project-section") ^^^^^^^^^^^^^^^^^^^^^^^^^


//Project section ---------------------------------------------------------------------------

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

window.onload = () => {
  //get projects
  //render projects list

  editProjectsListButton.style.display = "none"
}