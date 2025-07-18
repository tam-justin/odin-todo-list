/**
 * function to handle adding new projects, new tasks to the current project etc.
 */
function add(){
    console.log("Add dialog starting!");
    const wrapper = document.querySelector("#wrapper");
    
    //Create the dialog element.
    const dialog = document.createElement("dialog");

    //Setup a form.
    const form = document.createElement("form");

    const closeBtn = document.createElement("button");
    closeBtn.type = "submit";
    closeBtn.innerHTML = "X";
    
    const header = document.createElement("div");
    header.id = "form-header";

    header.appendChild(closeBtn);

    const sidebar = document.createElement("div");
    sidebar.id = "form-sidebar";

    const taskBtn = document.createElement("button");
    taskBtn.classList.add("navBtn");
    taskBtn.innerHTML = "Task";

    const projectBtn = document.createElement("button");

    form.appendChild(header);
    dialog.appendChild(form);
    wrapper.appendChild(dialog);
    dialog.showModal();
}

export default add;