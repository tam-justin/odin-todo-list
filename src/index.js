/**
 * Imported Pages
 */

/**
 * Imported Styles
 */
import "./styles/default.css";
import "./styles/task.css";
import "./styles/addDialog.css";
import "./styles/taskDialog.css";

/**
 * Imported Functions
 */
import initialLoad from "./functions/initialLoad.js";
import {def, projects} from "./functions/initialLoad.js";
import Project from "./functions/project.js";
import display from "./functions/display.js";

export let curProject = def;

export function handleProjectEvent(event){
    if(event.target.classList.contains("navBtn")){
        changeProject(event);
    }else if(event.target.classList.contains("removeProjBtn")){
        removeProject(event);
    }
}

function changeProject(event){
    if(event.currentTarget.id === curProject.getID()){
        return;
    }
    
    console.log("changing open project.");

    //Set new active project.
    display.updateActive(curProject.getID(), event.currentTarget.id);
    for(let i = 0; i < projects.length; i++){
        if(projects[i].getID() == event.currentTarget.id){
            curProject = projects[i];
        }
    }

    //Show new tasks.
    display.displayTasks();
}

function removeProject(event){
    const projID = event.currentTarget.id;

    const index = projects.findIndex(project => project.getID() === projID);
    if(index !== -1){
        projects.splice(index, 1);
    }

    if(curProject.getID() == projID){
        if(projects.length > 0){
            curProject = projects[0];
        }else{
            curProject = undefined;
        }
    }

    display.displayTasks();
    display.displayProjects();
}

projects.push(new Project("Default"));
initialLoad();