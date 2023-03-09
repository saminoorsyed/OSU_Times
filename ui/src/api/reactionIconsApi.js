// reactionicons api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'reactionicons/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        console.error(error);
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'reactionicons/');
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }
};

export async function postObject(NewObject) {
    try {
        console.log(url+`reactionicons/`)
        const response = await fetch(url+`reactionicons/`,
            {
                method:"POST", 
                body: JSON.stringify(NewObject),
                headers: {
                    'Content-Type': 'application/JSON',
                },
            });
    } catch (error) {
        alert(`Failed to create user, status code = ${error.message}`)
    }
}

export async function deleteObjects(id){
    try {
        let response = await fetch(
            url+`reactionicons/${id}`,
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
        const response = await fetch (url+ `reactionicons/${id}`, {
            method:"PUT", 
            body: JSON.stringify(editObject),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
    } catch (error) {
        console.log(error.message)
    }
}