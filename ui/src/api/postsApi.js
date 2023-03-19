// posts api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'posts/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        alert(error.message)
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'posts/');
        const data = await response.json()
        return data
    } catch (error) {
        alert(error.message)
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
        if (response.status === "400"){
            alert(`check that your entry is unique: error code ${response.status}`)
        }
    } catch (error) {
        alert(error.message)
    }
}

export async function deleteObjects(id){
    try {
        await fetch(
            url+`posts/${id}`,
            {method:"DELETE"});
    } catch (error) {
        alert(error.message)
    }
}

export async function updateDatabaseObject(id, editObject){
    try {
        await fetch (url+`posts/${id}`, {
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

export async function getIdObjectsGenres(){
    try {
        const response = await fetch(url+'genres/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.genre_name, item.genre_id])
        return namesList
    } catch (error) {
        alert(error.message)
    }
}

export async function getIdObjectsAuthors(){
    try {
        const response = await fetch(url+'authors/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.full_name, item.author_id])
        return namesList
    } catch (error) {
        alert(error.message)
    }
}