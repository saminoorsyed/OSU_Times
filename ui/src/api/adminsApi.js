// administrators api
const url = process.env.REACT_APP_URL

export async function getObjectColumnNames () {
    try {
        const response = await fetch(url+'administrators/columns');
        const colNames = await response.json();
        return colNames
    } catch (error) {
        console.error(error);
    }
}

export async function getObjects (){
    try {
        const response = await fetch(url+'administrators/');
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }
};

export async function postObject(NewObject) {
    try {
        const response = await fetch(url+`administrators/`,
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
            url+`administrators/${id}`,
            {method:"DELETE"});
        let data = await response.json();
        alert(data.status);
    } catch (error) {
    }
}

export async function updateDatabaseObject(id, editObject){
    try {
        const response = await fetch (url+`administrators/${id}`, {
            method:"PUT", 
            body: JSON.stringify(editObject),
            headers: {
                'Content-Type': 'application/JSON',
            },
        });
    } catch (error) {
    }
}