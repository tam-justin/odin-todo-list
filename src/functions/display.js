import {curProject, handleProjectEvent} from "../index.js";
import {projects} from "./initialLoad.js";
import handleCardEvent from "./cardEvent.js";
import {format} from "date-fns";
import {taskDialog} from "./taskDialog.js";

/**
 * functions to update changes to the display!
 */
const display = (function displayController(){
    const taskArea = document.querySelector("#content");

    const displayTasks = () => {
        taskArea.innerHTML = "";
        if(curProject == undefined){
            return;
        }
        const taskList = curProject.getTaskList();

        for(let i = 0; i < taskList.length; i++){
            //Create the card element in the DOM.
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = taskList[i].getID();

            //Create the task options section.
            const taskOptions = document.createElement("div");
            taskOptions.classList.add("task-options");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("task-checkbox");
            
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("removeTask");
            removeBtn.innerHTML = "Remove";

            taskOptions.appendChild(checkbox);
            taskOptions.appendChild(removeBtn);

            //Create the task info section.
            const taskInfo = document.createElement("div");
            taskInfo.classList.add("task-info");

            //Create the title-desc section.
            const title_desc = document.createElement("div");
            title_desc.classList.add("title-desc");

            const title = document.createElement("div");
            title.classList.add("task-title");
            title.innerHTML = taskList[i].getTitle();

            const desc = document.createElement("div");
            desc.classList.add("task-desc");
            desc.innerHTML = taskList[i].getDesc();

            title_desc.appendChild(title);
            title_desc.appendChild(desc);

            //Create the dueDate-priority section.
            const dd_prio = document.createElement("div");
            dd_prio.classList.add("dd-prio");

            const dueDate = document.createElement("div");
            dueDate.classList.add("task-due-date");
            dueDate.innerHTML = format(taskList[i].getDueDate(), 'MM/dd/yy');

            const priority = document.createElement("div");
            priority.classList.add("task-priority");
            priority.innerHTML = taskList[i].getPriority();

            if(taskList[i].getPriority() == "High"){
                priority.classList.add("high-prio");
            }else if(taskList[i].getPriority()  == "Medium"){
                priority.classList.add("med-prio");
            }else if(taskList[i].getPriority() == "Low"){
                priority.classList.add('low-prio');
            }

            if(taskList[i].getStatus()){
                card.classList.add("complete");
                checkbox.checked = true;
            }

            taskInfo.appendChild(title_desc);
            taskInfo.appendChild(dd_prio);

            dd_prio.appendChild(dueDate);
            dd_prio.appendChild(priority);

            card.appendChild(taskOptions);
            card.appendChild(taskInfo);

            card.addEventListener("click", handleCardEvent);
            
            taskArea.appendChild(card);
        }
    }

    const displayProjects = () => {
        console.log("displaying projects.");

        const nav = document.querySelector("#nav");
        nav.innerHTML = "";

        for(let i = 0; i < projects.length; i++){
            const project = document.createElement("div");
            project.classList.add("project");
            project.id = projects[i].getID();

            const projBtn = document.createElement("button");
            projBtn.classList.add("navBtn")
            projBtn.innerHTML = projects[i].getTitle();
            
            if(projects[i].getID() === curProject.getID()){
                projBtn.classList.add("active");
            }

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("removeProjBtn");
            removeBtn.innerHTML = "X";
            
            project.appendChild(projBtn);
            project.appendChild(removeBtn);

            nav.appendChild(project);

            project.addEventListener("click", handleProjectEvent);
        }
    }

    function updateActive(oldActive, newActive){
        console.log("updating active project");
        const nav = document.querySelector("#nav");

        for(let i = 0; i < nav.children.length; i++){
            let curElement = nav.children[i];
            if(curElement.id == oldActive){
                curElement.children[0].classList.remove("active");
            }else if(curElement.id == newActive){
                curElement.children[0].classList.add("active");
            }
        }
    }

    function removeProjectButton(event){
        event.currentTarget.remove();
    }

    function showTask(event){
        console.log(`Now showing task with ID ${event.currentTarget.id}`);

        let taskList = curProject.getTaskList();
        for(let i = 0; i < taskList.length; i++){
            if(event.currentTarget.id == taskList[i].getID()){
                taskDialog(taskList[i]);
            }
        }
    }

    return {
        displayTasks,
        updateActive,
        removeProjectButton,
        displayProjects,
        showTask
    }
})();

export default display;