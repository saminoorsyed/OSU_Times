// usersauthors api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'usersauthors/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        alert(error.status)
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'usersauthors/');
        const data = await response.json()
        return data
    } catch (error) {
        alert(error.status)
    }
};

export async function postObject(NewObject) {
    try {
        const response = await fetch(url+`usersauthors/`,
            {
                method:"POST", 
                body: JSON.stringify(NewObject),
                headers: {
                    'Content-Type': 'application/JSON',
                },
            });
    } catch (error) {
        alert(error.status)
    }
}

export async function deleteObjects(id){
    try {
        let response = await fetch(
            url+`usersauthors/${id}`,
            {method:"DELETE"});
        let data = await response.json();
    } catch (error) {
        alert(error.status)
    }
}

export async function updateDatabaseObject(id, editObject){
    try {
        const response = await fetch (url+`usersauthors/${id}`, {
            method:"PUT", 
            body: JSON.stringify(editObject),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
    } catch (error) {
        alert(error.status)
    }
}

export async function getIdObjectsUsers(){
    try {
        const response = await fetch(url+'users/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.full_name, item.user_id])
        return namesList
    } catch (error) {
        alert(error.status)
    }
}

export async function getIdObjectsAuthors(){
    try {
        const response = await fetch(url+'authors/nameslist');
        const namesObject = await response.json();
        const namesList = namesObject.map(item => [item.full_name, item.author_id])
        return namesList
    } catch (error) {
        alert(error.status)
    }
}