import axios from "axios";


let url = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
    return axios
        .get(url)
        .then((response) => response.data)
        .catch(() => {
            console.log("API error");
            return [];
        });
}
let users = await getUsers();
console.log(users);


//validating that name exists and is a string, and that email exists and is a string, id exists and is a number, and that address exists and is an object with a street property that is a string, a suite property that is a string, a city property that is a string, and a zipcode property that is a string
function validateUser(user) {
    if (!user.name) {
        throw new Error("User name is missing");
    }
	if (typeof user.name !== "string") {
		throw new Error("User name must be a string");
	}

    if (!user.email) {
        throw new Error("User email is missing");
    }
	if (typeof user.email !== "string") {
		throw new Error("User email must be a string");
	}

	if (!user.id) {
		throw new Error("User id is missing");
	}
    if (typeof user.id !== "number") {
        throw new Error("User id must be a number");
    }
}
  
for (const user of users) {
	try {
		validateUser(user);
		console.log(`User ${user.name} is valid`);
	} catch (error) {
		console.error(`User ${user.name} is invalid: ${error.message}`);
	}	
}
console.log("==================")
// first test with broken email

if (users.length > 0) {
    users[0].email = null;
}

for (const user of users) {
	try {
		validateUser(user);
		console.log(`User ${user.name} is valid`);
	} catch (error) {
		console.error(`User ${user.name} is invalid: ${error.message}`);
	}	
}

//let's break url and see if we get an error

url = "https://jsonplaceholder.typicode.com/does-not-exist";
users = await getUsers();
console.log(users);