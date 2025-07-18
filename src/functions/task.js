class Task {
    // Instance Variables
    #title;
    #desc;
    #dueDate;
    #priority;
    #notes;
    #id;
    #checklist;
    #completeStatus;

    // Constructor
    constructor(title, desc, dd, prio, notes, checklist){
        this.#title = title;
        this.#desc  = desc;
        this.#dueDate = dd;
        this.#priority = prio;
        this.#notes = notes;
        this.#checklist = checklist;
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

    getChecklist(){
        return this.#notes;
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

    setChecklist(newChecklist){
        this.#checklist = newChecklist;
    }

    markComplete(){
        this.#completeStatus = true;
    }

    markUncomplete(){
        this.#completeStatus = false;
    }

    getID(){
        return this.#id;
    }
}

export default Task;