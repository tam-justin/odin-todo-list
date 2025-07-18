class Project {
    #name;
    #id;
    taskList = [];

    constructor(name){
        this.#name = name;
        this.#id = crypto.randomUUID();
    }

    setTitle(newTitle){
        this.#name = newTitle;
    }

    getTitle(){
        return this.#name;
    }

    getID(){
        return this.#id;
    }

    getTaskList(){
        return this.taskList;
    }
}

export default Project;