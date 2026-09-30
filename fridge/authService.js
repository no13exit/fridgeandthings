import {ROLES} from "./config.js";

export function getUserByName(users, userName) {
    const clearName = userName.trim().toLowerCase();
    return users.find(user => user.name.toLowerCase() === clearName);
}
export function getAuthenticatedUser(
    users,
    userName
) {

    const user =
        getUserByName(
            users,
            userName
        );


    if (user) {
        return user;
    }


    return {
        name: userName,
        role: ROLES.GUEST
    };
}