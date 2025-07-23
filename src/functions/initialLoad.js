import {setup, newTaskForm} from "./addDialog.js";
import Project from "./project.js";
import Task from "./task.js";
import display from "./display.js";
import {parse} from "date-fns";
import {setupTaskDialog} from "./taskDialog.js"

export let projects = [];
export let localStorageAvailable;
export let firstLoad = true;

//Create default project.
export const def = new Project("Tasks");

function isStorageAvailable(type){
    let storage;
    try {
        storage = window[type];
        const x = "test-storage";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }catch (e){
        display.showStorageWarning();
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" && storage && storage.length !== 0
        );
    }
}

/**
 * Initial Load Function for the Webpage, starts at the Tasks page with a starter task!
 */
function load(){
    console.log("Setting up webpage, initial load!");

    //Add Listener for Add Button
    const addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", newTaskForm);

    //Update display.
    display.displayTasks();
    display.displayProjects();

    //Setup add form.
    setup();
    setupTaskDialog();

    //Check if we can use localstorage
    isStorageAvailable("localStorage") ? localStorageAvailable = true : localStorageAvailable = false;
    if(localStorageAvailable){
        if(!localStorage.getItem("projects")){
            //Create Starter Task
            const starterTask = new Task("Starter Task", "This is a starter task to show you how this webpage works! To complete this task, you should mark it as complete!", parse('12/31/2025', "MM/dd/yyyy", new Date()), "High", "This is the notes section of this task! You can add any extra information here.", def);
            def.taskList.push(starterTask);
            projects.push(def);
            populateStorage();
        }else if(localStorage.getItem("projects") === "[]"){
            //Create Starter Task
            const starterTask = new Task("Starter Task", "This is a starter task to show you how this webpage works! To complete this task, you should mark it as complete!", parse('12/31/2025', "MM/dd/yyyy", new Date()), "High", "This is the notes section of this task! You can add any extra information here.", def);
            def.taskList.push(starterTask);
            projects.push(def);
        }else{
            retrieveStorage();
            firstLoad = false;
        }
    }
}

export function populateStorage(){
    console.log("saving to localstorage");
    localStorage.setItem("projects", JSON.stringify(projects.map(p => p.toSerializable())));
}

export function retrieveStorage(){
    const storedProjectJSON = JSON.parse(localStorage.getItem("projects"));
    projects.length = 0;

    projects.push(...storedProjectJSON.map(projData => {
        const proj = new Project(projData.name);
        proj.setTaskList(projData.taskList.map(tData => {
            const task = new Task(tData.title, tData.desc, (tData.dueDate == "" ? "" : new Date(tData.dueDate)), tData.priority, tData.notes, proj);
            if(tData.completeStatus){
                task.markComplete();
            }
            return task;
        }))
        return proj;
    }))
}

export default load;