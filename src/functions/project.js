class Project {
    name;
    id;
    taskList = [];

    constructor(name){
        this.name = name;
        this.id = crypto.randomUUID();
    }

    toSerializable() {
        return {
            name: this.name,
            taskList: this.taskList.map(task => task.toSerializable())
        }
    }

    setTitle(newTitle){
        this.name = newTitle;
    }

    getTitle(){
        return this.name;
    }

    getID(){
        return this.id;
    }

    addTask(task){
        this.taskList.push(task);
    }

    getTaskList(){
        return this.taskList;
    }

    setTaskList(newTaskList){
        this.taskList = newTaskList;
    }
}

export default Project;