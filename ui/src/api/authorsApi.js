// authors api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'authors/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        console.error(error);
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'authors/');
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }
};

export async function postObject(NewObject) {
    try {
        const response = await fetch(url+`authors/`,
            {
                method:"POST", 
                body: JSON.stringify(NewObject),
                headers: {
                    'Content-Type': 'application/JSON',
                },
            });
            alert(response.status);
            console.log(NewObject)
    } catch (error) {
        alert(`Failed to create user, status code = ${error.message}`)
    }
}

export async function deleteObjects(id){
    try {
        let response = await fetch(
            url+`authors/${id}`,
            {method:"DELETE"});
        let data = await response.json();
        alert(data.status);
    } catch (error) {
        console.log(error.message)
    }
}

export async function updateDatabaseObject(id, editObject){
    console.log(editObject)
    try {
        const response = await fetch (url+`authors/${id}`, {
            method:"PUT", 
            body: JSON.stringify(editObject),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
        let data = await response.json();
        alert(data.status);
    } catch (error) {
        console.log(error.message)
    }
}

export async function getIdObjects(){
    try {
        const response = await fetch(url+'administrators/nameslistwithnull');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.full_name, item.admin_id])
        console.log(namesList)
        return namesList
    } catch (error) {
        console.error(error);
    }
}