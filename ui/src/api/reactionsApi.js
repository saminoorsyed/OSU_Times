// reactions api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'reactions/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        console.error(error);
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'reactions/');
        const data = await response.json()
        return data
    } catch (error) {
        alert(error.message)
    }
};

export async function postObject(NewObject) {
    try {
        const response = await fetch(url+`reactions/`,
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
            url+`reactions/${id}`,
            {method:"DELETE"});
    } catch (error) {
        alert(error.message)
    }
}

export async function updateDatabaseObject(id, editObject){
    try {
        await fetch (url+`reactions/${id}`, {
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

export async function getIdObjectsUsers(){
    try {
        const response = await fetch(url+'users/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.full_name, item.user_id])
        return namesList
    } catch (error) {
        alert(error.message)
    }
}

export async function getIdObjectsPosts(){
    try {
        const response = await fetch(url+'posts/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.title, item.post_id])
        return namesList
    } catch (error) {
        alert(error.message)
    }
}

export async function getIdObjectsReactionIcons(){
    try {
        const response = await fetch(url+'reactionicons/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.reaction_type, item.reaction_icon_id])
        return namesList
    } catch (error) {
        alert(error.message)
    }
}