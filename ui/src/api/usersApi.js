// users api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'users/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        alert(error.message)
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'users/');
        const data = await response.json()
        return data
    } catch (error) {
        alert(error.message)
    }
};

export async function postObject(NewObject) {
    try {
        const response = await fetch(url+`users/`,
            {
                method:"POST", 
                body: JSON.stringify(NewObject),
                headers: {
                    'Content-Type': 'application/JSON',
                },
            });
        if (response.status === "400"){
            alert(`check that your entry is unique: error code ${response.status}`)
        }
    } catch (error) {
        alert(error.message)
    }
}

export async function deleteObjects(id){
    try {
        let response = await fetch(
            url+`users/${id}`,
            {method:"DELETE"});
        let data = await response.json();
    } catch (error) {
        alert(error.message)
    }
}

export async function updateDatabaseObject(id, editObject){
    try {
        const response = await fetch (url+ `users/${id}`, {
            method:"PUT", 
            body: JSON.stringify(editObject),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
    } catch (error) {
        alert(error.message)
    }
}