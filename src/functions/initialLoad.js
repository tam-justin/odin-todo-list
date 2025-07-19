import {setup, newTaskForm} from "./addDialog.js";
import Project from "./project.js";
import Task from "./task.js";
import display from "./display.js";
import {parse} from "date-fns";
import {setupTaskDialog} from "./taskDialog.js"

export let projects = [];

//Create default project.
export const def = new Project("Tasks");
projects.push(def);

/**
 * Initial Load Function for the Webpage, starts at the Tasks page with a starter task!
 */
function load(){
    console.log("Setting up webpage, initial load!");

    //Add Listener for Add Button
    const addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", newTaskForm);

    //Create Starter Task
    const starterTask = new Task("Starter Task", "This is a starter task to show you how this webpage works! To complete this task, you should mark it as complete!", parse('12/31/2025', "MM/dd/yyyy", new Date()), "High", "This is the notes section of this task! You can add any extra information here.", def);
    def.taskList.push(starterTask);

    //Update display.
    display.displayTasks();
    display.displayProjects();

    //Setup add form.
    setup();
    setupTaskDialog();
}

export default load;