import {
    readFromJsonFile
} from "./fileService.js";

import {
    getAuthenticatedUser
} from "./authService.js";

import {
    FRIDGE_FILE,
    USERS_FILE
} from "./config.js";

import {
    createBasePromptByRole,
    createPrompt
} from "./promptService.js";

import {
    askAi
} from "./aiService.js";


const form =
    document.getElementById(
        "searchForm"
    );

const userNameInput =
    document.getElementById(
        "userName"
    );

const dishTitleInput =
    document.getElementById(
        "dishTitle"
    );

const result =
    document.getElementById(
        "result"
    );

const errorModal =
    document.getElementById(
        "errorModal"
    );

const errorMessage =
    document.getElementById(
        "errorMessage"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


function validateInput(
    userName,
    dishTitle
) {

    if (!userName) {

        throw new Error(
            "User name is required"
        );
    }


    if (!dishTitle) {

        throw new Error(
            "Dish title is required"
        );
    }
}


function showError(message) {

    errorMessage.textContent =
        message;

    errorModal.showModal();
}


async function searchDish(
    userName,
    dishTitle
) {

    const users =
        await readFromJsonFile(
            USERS_FILE
        );


    const authenticatedUser =
        getAuthenticatedUser(
            users,
            userName
        );




    const products =
        await readFromJsonFile(
            FRIDGE_FILE
        );


    const basePrompt =
        createBasePromptByRole(
            authenticatedUser
        );


    const prompt =
        createPrompt(
            basePrompt,
            dishTitle,
            products
        );


    return askAi(
        prompt
    );
}


async function handleSearch(event) {

    event.preventDefault();


    const userName =
        userNameInput
            .value
            .trim();


    const dishTitle =
        dishTitleInput
            .value
            .trim();


    try {

        validateInput(
            userName,
            dishTitle
        );


        result.textContent =
            "Получаем ответ...";


        const answer =
            await searchDish(
                userName,
                dishTitle
            );


        result.textContent =
            answer;


    } catch (error) {

        console.error(
            "ERROR:",
            error
        );


        result.textContent = "";


        showError(
            error.message
        );
    }
}


form.addEventListener(
    "submit",
    handleSearch
);


closeModal.addEventListener(
    "click",

    () => {
        errorModal.close();
    }
);