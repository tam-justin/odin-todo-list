import display from "./display.js";
import {populateStorage, projects} from "./initialLoad.js";
import Project from "./project.js";
import { setCurProject } from "../index.js";

/**
 * add project to the library.
 */
function addProject(){
    console.log("adding this project!");

    const form = document.querySelector("#add-form");
    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }

    const projName = document.querySelector("#projectName").value;
    
    let tmp = new Project(projName);
    projects.push(tmp);

    //If this new project is the only one, set it to the new current project.
    if(projects.length == 1){
        setCurProject(tmp);
    }

    //Update the display.
    display.displayProjects();

    const dialog = document.querySelector("#add-dialog");
    dialog.close();

    populateStorage();
}

export default addProject;