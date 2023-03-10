// posts api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'posts/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        console.error(error);
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'posts/');
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }
};

export async function postObject(NewObject) {
    try {
        const response = await fetch(url+`posts/`,
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
            url+`posts/${id}`,
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
        const response = await fetch (url+`posts/${id}`, {
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

export async function getIdObjectsGenres(){
    try {
        const response = await fetch(url+'genres/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.genre_name, item.genre_id])
        console.log(namesList)
        return namesList
    } catch (error) {
        console.error(error);
    }
}

export async function getIdObjectsAuthors(){
    try {
        const response = await fetch(url+'authors/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.full_name, item.author_id])
        console.log(namesList)
        return namesList
    } catch (error) {
        console.error(error);
    }
}