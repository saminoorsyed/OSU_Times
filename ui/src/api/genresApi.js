// genres api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'genres/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        alert(error.message)
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'genres/');
        const data = await response.json()
        return data
    } catch (error) {
        alert(error.message)
    }
};

export async function postObject(NewObject) {
    try {
        await fetch(url+`genres/`,
            {
                method:"POST", 
                body: JSON.stringify(NewObject),
                headers: {
                    'Content-Type': 'application/JSON',
                },
            });
    } catch (error) {
        alert(error.message)
    }
}

export async function deleteObjects(id){
    try {
        let response = await fetch(
            url+`genres/${id}`,
            {method:"DELETE"});
    } catch (error) {
        alert(error.message)
    }
}

export async function updateDatabaseObject(id, editObject){
    try {
        await fetch (url+`genres/${id}`, {
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