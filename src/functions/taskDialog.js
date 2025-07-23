import { populateStorage, projects } from "./initialLoad";
import {format, parse} from "date-fns";
import display from "./display";

/**
 * setup the dialog for viewing tasks in more detail!
 */
export function setupTaskDialog(){
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.id = "task-dialog";

    const header = document.createElement('div');
    header.id = "task-dialog-header";

    const title = document.createElement("div");
    title.innerHTML = "Edit Task";

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "x";
    closeBtn.id = "task-dialog-close";

    const contentArea = document.createElement("div");
    contentArea.id = "task-dialog-content";

    closeBtn.addEventListener("click", () => {
        dialog.close();
    })

    header.appendChild(title);
    header.appendChild(closeBtn);
    
    dialog.appendChild(header);
    dialog.appendChild(contentArea);
    body.appendChild(dialog);
}

export function taskDialog(task){
    const dialog = document.querySelector("#task-dialog");
    const content = document.querySelector("#task-dialog-content");
    content.innerHTML = "";

    const name = document.createElement("input");
    name.id = "edit-name";
    name.type = "text";
    name.value = task.getTitle();

    const desc = document.createElement("textarea");
    desc.rows = "7";
    desc.value = task.getDesc();
    desc.id = "edit-desc";

    const proj = document.createElement("select");
    proj.id = "edit-proj";
    
    for(let i = 0; i < projects.length; i++){
        const option = document.createElement("option");
        option.value = projects[i].getID();
        option.innerHTML = projects[i].getTitle();
        if(option.value == task.getProject().getID()){
            option.selected = "selected";
        }
        proj.appendChild(option);
    }

    const priority = document.createElement("select");
    priority.id = "edit-priority";

    const highPrio = document.createElement("option");
    highPrio.value = "High";
    highPrio.innerHTML = "High";

    const medPrio = document.createElement("option");
    medPrio.value = "Medium";
    medPrio.innerHTML = "Medium";

    const lowPrio = document.createElement("option");
    lowPrio.value = "Low";
    lowPrio.innerHTML = "Low";

    priority.appendChild(highPrio);
    priority.appendChild(medPrio);
    priority.appendChild(lowPrio);

    if(task.getPriority() == "High"){
        highPrio.selected = "selected";
    }else if(task.getPriority() == "Medium"){
        medPrio.selected = "selected";
    }else {
        lowPrio.selected = "selected";
    }

    const dd = document.createElement("input");
    dd.type = "date";
    dd.value = (task.getDueDate() == "" ? "" : format(task.getDueDate(), 'yyyy-MM-dd'));
    dd.id = "edit-dd";

    const notes = document.createElement("textarea");
    notes.rows = "7";
    notes.value = task.getNotes();
    notes.id = "edit-notes";

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save Changes";
    saveBtn.id = "saveButton";

    saveBtn.addEventListener("click", () => {
        const taskID = task.getID();
        console.log(taskID);
        
        //Get all new inputs.
        const newName = document.querySelector("#edit-name").value;
        const newDesc = document.querySelector("#edit-desc").value;
        const newProjID = document.querySelector("#edit-proj").value;
        const newPrio = document.querySelector("#edit-priority").value;
        const newDD = document.querySelector("#edit-dd").value;
        const newNotes = document.querySelector("#edit-notes").value;

        //Set new properties.
        task.setTitle(newName);
        task.setDesc(newDesc);
        task.setPriority(newPrio);
        task.setDueDate(newDD == "" ? "" : parse(`${newDD}`, 'yyyy-MM-dd', new Date()));
        task.setNotes(newNotes);

        //If the project has been changed, remove from current and add to new project.
        const newProj = projects[projects.findIndex(elem => elem.getID() == newProjID)];
        if(newProj != task.getProject()){
            //Locate the task from the current project's task list.
            const taskList = task.getProject().getTaskList();
            const index = taskList.findIndex(elem => elem.getID() == taskID);
            if(index !== -1){
                taskList.splice(index, 1);
            }
            newProj.addTask(task);
            task.setProject(newProj);
        }

        display.displayTasks();
        dialog.close();

        populateStorage();
    });
    
    content.appendChild(name);
    content.appendChild(desc);
    content.appendChild(proj);
    content.appendChild(priority);
    content.append(dd);
    content.appendChild(notes);
    content.appendChild(saveBtn);
    dialog.showModal();
}