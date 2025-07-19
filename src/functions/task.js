import { projects } from "./initialLoad";

class Task {
    // Instance Variables
    #title;
    #desc;
    #dueDate;
    #priority;
    #notes;
    #id;
    #project;
    #completeStatus;

    // Constructor
    constructor(title, desc, dd, prio, notes, project){
        this.#title = title;
        this.#desc  = desc;
        this.#dueDate = dd;
        this.#priority = prio;
        this.#notes = notes;
        this.#project = project;
        this.#completeStatus = false;
        this.#id = crypto.randomUUID();
    }

    // Getters
    getTitle(){
        return this.#title;
    }

    getDesc(){
        return this.#desc;
    }

    getDueDate(){
        return this.#dueDate;
    }

    getPriority(){
        return this.#priority;
    }

    getNotes(){
        return this.#notes;
    }

    getStatus(){
        return this.#completeStatus;
    }

    getProject(){
        return this.#project;
    }

    getID(){
        return this.#id;
    }

    // Setters
    setTitle(newTitle){
        this.#title = newTitle; 
    }

    setDesc(newDesc){
        this.#desc = newDesc;
    }

    setDueDate(newDD){
        this.#dueDate = newDD;
    }

    setPriority(newPrio){
        this.#priority = newPrio;
    }

    setNotes(newNotes){
        this.#notes = newNotes;
    }

    markComplete(){
        this.#completeStatus = true;
    }

    markUncomplete(){
        this.#completeStatus = false;
    }

    setProject(newProject){
        this.#project = newProject;
    }
}

export default Task;