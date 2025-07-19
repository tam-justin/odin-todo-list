/**
 * function to handle adding new projects, new tasks to the current project etc.
 */
function add(){
    console.log("Add dialog starting!");
    const wrapper = document.querySelector("#wrapper");
    
    //Create the dialog element.
    const dialog = document.createElement("dialog");
    dialog.id = "add-dialog";

    //Create a header area.
    const header = document.createElement("div");
    header.id = "form-header";

    const title = document.createElement("div");
    title.id = "form-title";
    title.innerHTML = "Add new...";
    header.appendChild(title);

    //Add a close button.
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.innerHTML = "X";
    closeBtn.id = "form-close";
    header.appendChild(closeBtn);

    //Create a sidebar.
    const sidebar = document.createElement("div");
    sidebar.id = "form-sidebar";

    

    //Add to the dialog the header, sidebar, and form area.
    dialog.appendChild(header);
    dialog.appendChild(sidebar);
    
    wrapper.appendChild(dialog);
    dialog.showModal();
}

export default add;