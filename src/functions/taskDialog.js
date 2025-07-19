import { projects } from "./initialLoad";
import {format} from "date-fns";

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
    name.type = "text";
    name.value = task.getTitle();

    const desc = document.createElement("textarea");
    desc.rows = "7";
    desc.value = task.getDesc();

    const proj = document.createElement("select");
    
    for(let i = 0; i < projects.length; i++){
        const option = document.createElement("option");
        option.value = projects[i].getTitle();
        option.innerHTML = projects[i].getTitle();
        if(option.value == task.getProject().getTitle()){
            option.selected = "selected";
        }
        proj.appendChild(option);
    }

    const priority = document.createElement("select");

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
    dd.value = format(task.getDueDate(), "yyyy-MM-dd");

    const notes = document.createElement("textarea");
    notes.rows = "7";
    notes.value = task.getNotes();

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save Changes";
    saveBtn.id = "saveButton";
    
    content.appendChild(name);
    content.appendChild(desc);
    content.appendChild(proj);
    content.appendChild(priority);
    content.append(dd);
    content.appendChild(notes);
    content.appendChild(saveBtn);
    dialog.showModal();
}