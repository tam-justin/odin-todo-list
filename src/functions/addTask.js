import display from "./display.js";
import {projects} from "./initialLoad.js";
import Task from "./task.js";
import {forma, parse} from "date-fns";

/**
 * adds a task to the a given project.
 */
function addTask(){
    //Check if required fields are there.
    const form = document.querySelector("#add-form");
    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }
    
    console.log("adding this task!");
    //Get the input and save it.
    const taskName = document.querySelector("#taskName").value;
    const taskDesc = document.querySelector("#taskDesc").value;
    const taskProj = document.querySelector("#taskProj").value;
    const taskPrio = document.querySelector("#taskPrio").value;
    const taskDate = document.querySelector("#taskDate").value;
    const taskNotes = document.querySelector("#taskNotes").value;

    //Find the correct project and create and add this task.
    const index = projects.findIndex(project => project.getID() == taskProj);
    
    const targetProj = projects[index];
    targetProj.addTask(new Task(taskName, taskDesc, (taskDate == "" ? "" : parse(`${taskDate}`, 'yyyy-MM-dd', new Date())), taskPrio, taskNotes, targetProj));
    display.displayTasks();

    const dialog = document.querySelector("#add-dialog");
    dialog.close();
}

export default addTask;