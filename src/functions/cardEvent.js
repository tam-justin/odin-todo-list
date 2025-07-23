import {curProject} from "../index.js";
import display from "./display.js";
import { populateStorage } from "./initialLoad.js";

function handleEvent(event){
    console.log(`A card with ID ${event.currentTarget.id} was clicked!`);

    if(event.target.classList.contains("task-checkbox")){
        setStatus(event);
    }else if(event.target.classList.contains("removeTask")){
        removeTask(event);
    }else{
        display.showTask(event);
    }
}

function removeTask(event){
    console.log(`removing task with ID ${event.currentTarget.id}!`);

    let taskList = curProject.getTaskList();
    const index = taskList.findIndex(task => task.getID() === event.currentTarget.id);
    if(index !== -1){
        taskList.splice(index, 1);
    }

    populateStorage();

    display.displayTasks();
}

function setStatus(event){
    console.log("setting status!");

    let taskList = curProject.getTaskList();
    for(let i = 0; i < taskList.length; i++){
        if(event.currentTarget.id == taskList[i].getID()){
            console.log(event.target.value);
            if(event.target.checked){
                taskList[i].markComplete();
                event.currentTarget.classList.add("complete");
            }else{
                taskList[i].markUncomplete();
                event.currentTarget.classList.remove("complete");
            }
        }
    }

    populateStorage();
}

export default handleEvent;