/**PROMISES */

//GET
export const  get = async (URL) =>{
    const response = await fetch(URL);
    return await response.json();
}

//POST
export async function post(URL, data) {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json(); // Devolver la respuesta JSON del servidor
}

//DELETE
export const deleteTask = async (URL,Id) =>{
    await fetch(`${URL}/${Id}`,{
        method : "DELETE"
    })
}

//EDIT
export const toggleTaskCompletion = async (URL, id, updatedTask) =>{
    await fetch(`${URL}/${id}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(updatedTask)
    })
}

