import addProject from "./addProject.js";
import addTask from "./addTask.js";
import {projects} from "./initialLoad.js";

let curPage = "task";

/**
 * function to handle adding new projects, new tasks to the current project etc.
 */
export function setup(){
    console.log("Add dialog setup!");
    const wrapper = document.querySelector("body");
    
    //Create the dialog element.
    const dialog = document.createElement("dialog");
    dialog.id = "add-dialog";

    //Create a header area.
    const header = document.createElement("div");
    header.id = "form-header";

    const title = document.createElement("div");
    title.id = "form-title";
    title.innerHTML = "Add new...";
    header.appendChild(title);

    //Add a close button.
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.innerHTML = "X";
    closeBtn.id = "form-close";
    header.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
        dialog.close();
    })

    //Create a sidebar.
    const sidebar = document.createElement("div");
    sidebar.id = "form-sidebar";

    //Create a nav inside the sidebar.
    const nav = document.createElement("nav");
    nav.id = "form-nav";
    sidebar.appendChild(nav);

    const taskBtn = document.createElement("button");
    taskBtn.classList.add("navBtn");
    taskBtn.classList.add("active");
    taskBtn.id = "create-task";
    taskBtn.innerHTML = "Task";
    nav.appendChild(taskBtn);

    const projectBtn = document.createElement("button");
    projectBtn.classList.add("navBtn");
    projectBtn.id = "create-proj";
    projectBtn.innerHTML = "Project";
    nav.appendChild(projectBtn);

    //Populate form.
    const formArea = document.createElement("div");
    formArea.id = "form-area";

    //Add to the dialog the header, sidebar, and form area.
    dialog.appendChild(header);
    dialog.appendChild(sidebar);
    dialog.appendChild(formArea);
    
    wrapper.appendChild(dialog);

    setupListeners();
}

export function newTaskForm(){
    const dialog = document.querySelector("#add-dialog");
    const formArea = document.querySelector("#form-area");
    formArea.innerHTML = "";

    const form = document.createElement("form");
    form.id = "add-form";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.type = "button";
    addTaskBtn.innerHTML = "Add Task!";
    addTaskBtn.id = "add-task";

    const nameLabel = document.createElement("label");
    nameLabel.innerHTML = "Enter your task name:";
    nameLabel.for = "taskName";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "taskName";
    nameInput.name = "taskName";

    const descLabel = document.createElement("label");
    descLabel.innerHTML = "Enter a description of your task:";
    descLabel.for = "taskDesc";

    const descInput = document.createElement("textarea");
    descInput.id = "taskDesc";
    descInput.name = "taskDesc";
    descInput.rows = "7";

    const projectLabel = document.createElement("label");
    projectLabel.innerHTML = "Select a project to add this task to:";
    projectLabel.for = "taskProj";

    const projInput = document.createElement("select");
    projInput.id = "taskProj";

    for(let i = 0; i < projects.length; i++){
        const option = document.createElement("option");
        option.value = projects[i].getTitle();
        option.innerHTML = projects[i].getTitle();
        projInput.appendChild(option);
    }

    const dd_prio = document.createElement("div");
    dd_prio.id = "form-due-prio-sec";

    const prioritySection = document.createElement("div");
    prioritySection.id = "form-priority";

    const priorityLabel = document.createElement("label");
    priorityLabel.innerHTML = "Select the level of priority of your task:";
    priorityLabel.for = "taskPrio";

    const priorityInput = document.createElement("select");
    priorityInput.id = "taskPrio";
    priorityInput.name = "taskPrio";

    const highPrio = document.createElement("option");
    highPrio.value = "High";
    highPrio.innerHTML = "High";

    const medPrio = document.createElement("option");
    medPrio.value = "Medium";
    medPrio.innerHTML = "Medium";

    const lowPrio = document.createElement("option");
    lowPrio.value = "Low";
    lowPrio.innerHTML = "Low";

    priorityInput.appendChild(highPrio);
    priorityInput.appendChild(medPrio);
    priorityInput.appendChild(lowPrio);

    prioritySection.appendChild(priorityLabel);
    prioritySection.appendChild(priorityInput);

    dd_prio.appendChild(prioritySection);

    const dateSection = document.createElement("div");
    dateSection.id = "form-date-sec";

    const dateLabel = document.createElement("label");
    dateLabel.for = "taskDate";
    dateLabel.innerHTML = "Select the due date of your task:";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "taskDate";
    dateInput.name = "taskDate";

    dateSection.appendChild(dateLabel);
    dateSection.appendChild(dateInput);

    dd_prio.appendChild(dateSection);

    const notesLabel = document.createElement("label");
    notesLabel.for = "tasknotes";
    notesLabel.innerHTML = "Add notes for your task here:"

    const notesInput = document.createElement("textarea");
    notesInput.id = "taskNotes";
    notesInput.rows = "7";
    notesInput.name = "taskNotes"

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(projectLabel);
    form.appendChild(projInput);
    form.appendChild(dd_prio);
    form.appendChild(notesLabel);
    form.appendChild(notesInput);
    form.appendChild(addTaskBtn);
    
    formArea.appendChild(form);

    const taskForm = document.querySelector("#create-task");
    const projectForm = document.querySelector("#create-proj");
    taskForm.classList.add("active");
    projectForm.classList.remove("active");
    curPage = "task";

    addTaskBtn.addEventListener("click", addTask);
    
    dialog.showModal();
}

function newProjectForm(){
    const formArea = document.querySelector("#form-area");
    formArea.innerHTML = "";

    const form = document.createElement("form");
    form.id = "add-form";

    const addProjBtn = document.createElement("button");
    addProjBtn.type = "button";
    addProjBtn.innerHTML = "Add Project!";
    addProjBtn.id = "add-project";

    const nameLabel = document.createElement("label");
    nameLabel.innerHTML = "Enter your project name:";
    nameLabel.for = "projectName";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "projectName";
    nameInput.name = "projectName";

    formArea.appendChild(form);
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(addProjBtn);

    addProjBtn.addEventListener("click", addProject);
}

function setupListeners(){
    const taskForm = document.querySelector("#create-task");
    const projectForm = document.querySelector("#create-proj");

    taskForm.addEventListener("click", () => {
        if(curPage == "task"){
            return;
        }
        taskForm.classList.add("active");
        projectForm.classList.remove("active");
        curPage = "task";
        newTaskForm();
    })

    projectForm.addEventListener("click", () => {
        if(curPage == "project"){
            return;
        }
        projectForm.classList.add("active");
        taskForm.classList.remove("active");
        curPage = "project";
        newProjectForm();
    })
}