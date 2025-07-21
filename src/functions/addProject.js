import display from "./display.js";
import {projects} from "./initialLoad.js";
import Project from "./project.js";

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
    
    projects.push(new Project(projName));
    display.displayProjects();

    const dialog = document.querySelector("#add-dialog");
    dialog.close();
}

export default addProject;