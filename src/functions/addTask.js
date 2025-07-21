import {projects} from "./initialLoad.js";

/**
 * adds a task to the a given project.
 */
function addTask(){
    console.log("adding this task!");

    //Check if required fields are there.
    const form = document.querySelector("#add-form");
    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }
    
    //Get the input and save it.
    const taskName = document.querySelector("#taskName").value;
    const taskDesc = document.querySelector("#taskDesc").value;
    const taskProj = document.querySelector("#taskProj").value;
    const taskPrio = document.querySelector("#taskPrio").value;
    const taskDate = document.querySelector("#taskDate").value;
    const taskNotes = document.querySelector("#taskNotes").value;

    //Find the correct project and create and add this task.
    const index = projects.findIndex(project => project.getTitle() == taskProj);
    console.log(index);

    console.log(taskName);
    console.log(taskDesc);
    console.log(taskProj);
    console.log(taskPrio);
    console.log(taskDate);
    console.log(taskNotes);
}

export default addTask;