export async function fetchColumnNames () {
            try {
                const response = await fetch('http://flip3.engr.oregonstate.edu:4004/api/users/columns');
                const data = await response.json();
                const names = data.map((column) => column.COLUMN_NAME);
                return names
            } catch (error) {
                console.error(error);
            }
        }

export async function fetchObjects (){
            try {
                const response = await fetch('http://flip3.engr.oregonstate.edu:4004/api/users/');
                const data = await response.json()
                return data
            } catch (error) {
                console.error(error);
            }
        };