import { post,get,deleteTask,toggleTaskCompletion } from "../index.js";
import { URL_TASKS } from "../routes.js";

/**add */
const taskInputTitle = document.getElementById("title");
const taskInputDescription = document.getElementById("description");
const taskInputStatus = document.getElementById("status");
const addTask = document.getElementById("addTask");

/**show */
const contentTbody = document.querySelector("tbody");

/**add task */
addTask.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = taskInputTitle.value;
    const description = taskInputDescription.value;
    const statusTask = taskInputStatus.value;

    const data = {
        title,
        description,
        statusTask
    }

    await post(URL_TASKS,data);
});

/**show task */
const showTasks = async () => {
    const tasks = await get(URL_TASKS);
    tasks.forEach(task => {
        const tr = document.createElement("tr");

        const titleTd = document.createElement("td");
        titleTd.textContent = task["title"]; // Agregar el título al TD

        const descriptionTd = document.createElement("td");
        descriptionTd.textContent = task["description"]; // Agregar la descripción al TD

        const statusTaskTd = document.createElement("td");
        statusTaskTd.textContent = task["statusTask"]; // Agregar el estado al TD

        const tdDelete = document.createElement("td");
        const btnDelete = document.createElement("button");

        btnDelete.classList = "btn btn-danger";
        btnDelete.textContent = "Eliminar";

        btnDelete.addEventListener("click", async () => {
            await deleteTask(URL_TASKS, task["id"]);
        });

        tdDelete.appendChild(btnDelete); // Agregar el botón de eliminar al TD

        const editTd = document.createElement("td");
        const div = document.createElement("div");
        div.classList = "toggle-container";
        editTd.appendChild(div);

        const inputToggle = document.createElement("input");
        inputToggle.type = "checkbox";
        inputToggle.classList = "toggle-input";
        inputToggle.id = `toggle-${task.id}`; // Asignar un ID único a cada toggle

        const label = document.createElement("label");
        label.classList = "toggle-label";
        label.htmlFor = `toggle-${task.id}`; // Asociar la etiqueta con el input correspondiente

        const span = document.createElement("span");
        span.classList = "toggle-text";
        span.textContent = "Pendiente";

        div.append(inputToggle, label, span);

        inputToggle.addEventListener("change", async () => {
            const newStatus = inputToggle.checked ? "completada" : "pendiente";
            const updatedTask = { ...task, statusTask: newStatus };
            await toggleTaskCompletion(URL_TASKS, task["id"], updatedTask);
            statusTaskTd.textContent = newStatus;
        });
        
        tr.append(titleTd, descriptionTd, statusTaskTd, tdDelete, editTd);
        contentTbody.appendChild(tr);
    });
}



showTasks();
