//import { compareAsc, format } from "date-fns"
//import {} from "./style.css"

const projects = []

class Project {
  constructor(name, description, theme = '', tasks = []) {
    this.name = name
    this.description = description
    this.theme = theme
    this.tasks = tasks
  }

  getTheme() {
    return this.theme.toString()
  }

  addTask(newTodo) {
    this.tasks.push(newTodo)
  }

  removeTask(todo) {
    this.tasks.splice(this.tasks.indexOf(todo), 1)
  }

  getTasks() {
    return this.tasks
  }
}

class Task {
  constructor(text, dueDate = '', priority = '') {
    this.text = text
    this.completed = false
  }

  getTitle() {
    return this.title
  }

  getText() {
    return this.description
  }

  getCompleted() {
    return this.completed
  }

  toggleCompleted() {
    this.completed = !this.completed
  }
}

const todoPanel = document.getElementById("todo-panel")

const addProject = (project) => {
  projects.push(project)

  localStorage.setItem("projects", JSON.stringify(projects))
}

const addTask = (project, task) => {
  project.addTask(task)

  localStorage.setItem("projects", JSON.stringify(projects))
}

const removeTask = (project, task) => {
  project.removeTask(task)

  localStorage.setItem("projects", JSON.stringify(parsedProjects))
}

const removeProject = (project, domProject) => {
  projects.splice(projects.indexOf(project), 1)

  domProjects[domProjects.indexOf(domProject)].remove()
  domProjects.splice(domProjects.indexOf(domProject), 1)

  localStorage.setItem("projects", JSON.stringify(projects))

  
  if (projects.length == 0) {
    clearLastProject()
    emptyProjectSection.classList.remove("hidden")
    projectSection.classList.add("hidden")
  } else if (project.name = currentProject.name) {
    clearLastProject()
  }
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

const emptyProjectSection = document.getElementById('empty-project-panel')
const projectSection = document.querySelector(".project-section")
const projectContentBox = document.getElementById('project-content')
const upcomingTasksPanel = document.querySelector(".project-task-upcoming")

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

function createNewProject(name, description, theme) {
  const newProject = new Project(name, description, theme)
  addProject(newProject)

  localStorage.setItem("projects", JSON.stringify(projects))
  localStorage.setItem(newProject.name, JSON.stringify(newProject))
}

function addClickEventToProject(project) {
  project.addEventListener("click", () => {
    const projectName = project.id.split('_')[0]
    const selectedProject = projects.find((project) => project.name === projectName)

    if (editingProjects) {
      removeProject(selectedProject, project)
      projectListEditMode()
    } else {
      openProject(selectedProject)
    }
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
  projectContentBox.style.gridTemplateColumns = "1.5fr 2fr"
  upcomingTasksPanel.classList.add("hidden")

  openProjectsPanelButton.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>'

  projectsPanelOpen = true

  delay(200).then(() => {
    projectsPanel.classList.remove("projects-panel-slideout")
  })
}

function collapseProjectsPanel() {
  openProjectsPanelButton.classList.remove("hidden")
  projectsPanel.classList.add("projects-panel-slideout")
  projectContentBox.style = ""
  upcomingTasksPanel.classList.remove("hidden")

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


function validateNewProjectInput(projectName, projectDescription, theme) {
  if (projectName == "") {
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
  else if (theme == "") {
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

    addClickEventToProject(projectItem)
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
  if (addProjectPanelOpen) {
    closeCreateProjectPanel()
  }

  document.documentElement.style.setProperty('--accent-color', setThemeColor(project.getTheme()));
  emptyProjectSection.classList.add('hidden')

  setupProjectSection(project)

  delay(100).then(() => {
    collapseProjectsPanel()
  })

  delay(400).then(() => {
    projectSection.classList.remove("hidden")
  })
}
//-------------------------------------------------------------------------------------------


//Project section ---------------------------------------------------------------------------
const projectTaskArticle = document.querySelector(".project-task-list")
const projectTasksList = document.getElementById('tasks-list')
const addTaskButton = document.getElementById('project-add-task-btn')

const projectTitle = document.querySelector('.project-title')
const projectDescription = document.querySelector('.project-description')

let currentProject = null

let domTasks = []
let creatingTask = false

addTaskButton.addEventListener("click", () => {
  if (!creatingTask) {
    createNewTask()
    addTaskButton.classList.add("hidden")
  } else {}
})

function setupProjectSection(project) {
  clearLastProject()
  currentProject = project

  projectTitle.textContent = project.name
  projectDescription.textContent = project.description

  populateProjectTasksList(project)
}

function clearLastProject() {
  domTasks.length = 0
  projectTasksList.innerHTML = ""

  projectTitle.textContent = ""
  projectDescription.textContent = ""
}

function populateProjectTasksList(project) {
  project.tasks.forEach((task) => {
    createDOMTask(task)
  })
}

function createDOMTask(task) {
  const taskListItem = document.createElement("li")

  const taskCompletedButton = document.createElement("span")
  taskCompletedButton.innerHTML = '<span class="material-symbols-outlined">radio_button_unchecked</span>'

  taskCompletedButton.addEventListener("click", () => {
    task.toggleCompleted()
    taskCompletedButton.innerHTML = task.getCompleted() ? '<span class="material-symbols-outlined">check_circle</span>' : '<span class="material-symbols-outlined">radio_button_unchecked</span>'
  })

  const taskText = document.createElement("p")
  taskText.textContent = task.text

  taskListItem.appendChild(taskCompletedButton)
  taskListItem.appendChild(taskText)
  projectTasksList.appendChild(taskListItem)

  addTaskToDOMArray(taskListItem)
}

function addTaskToDOMArray(task) {
  domTasks.push(task)
}

function removeTaskFromDOMArray(task) {
  domTasks.splice(domTasks.indexOf(task), 1)
}

function createNewTask() {
  creatingTask = true

  const taskListItem = document.createElement("li")
  taskListItem.classList.add("new-task")

  const taskCompletedButton = document.createElement("span")
  taskCompletedButton.innerHTML = '<span class="material-symbols-outlined">radio_button_unchecked</span>'

  const taskTextInput = document.createElement("textarea")
  taskTextInput.placeholder = "Enter task name"
  taskTextInput.classList.add("new-task-input")

  taskListItem.appendChild(taskCompletedButton)
  taskListItem.appendChild(taskTextInput)
  projectTasksList.appendChild(taskListItem)

  taskTextInput.focus()
  taskTextInput.select()

  taskTextInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      appendNewTask(taskListItem, taskTextInput.value)
    }
  })

  taskTextInput.addEventListener("focusout", () => {
    appendNewTask(taskListItem, taskTextInput.value)
  })
}

function appendNewTask(task, taskText) {
  const newTask = new Task(taskText)

  if (taskText == "") {
    //do nothing
    task.remove()
  } else {
    createDOMTask(newTask)
    currentProject.addTask(newTask)

    localStorage.setItem("projects", JSON.stringify(projects))
  }

  task.remove()
  creatingTask = false
  addTaskButton.classList.remove("hidden")
}
//------------------------------------------------------------------------------------

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

window.onload = () => {
  if (localStorage.getItem("projects") == null) {
    editProjectsListButton.style.display = "none"
  } else {
    editProjectsListButton.style.display = "block"

    const storedProjects = localStorage.getItem("projects")
    const parsedProjects = JSON.parse(storedProjects)

    parsedProjects.forEach((project) => {
      const newProject = new Project(project.name, project.description, project.theme, project.tasks)
      addProject(newProject)
    })

    renderProjectsList()
  }
}