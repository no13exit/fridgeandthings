import {ROLES} from "./config.js";

export function createBasePromptByRole(user) {
    if (user.role === ROLES.ADMIN) {
        return `
        Ты - квалифицированный повар, определяющий ингредиенты
        блюда по названию блюда. 
        Тебе дается название желаемого и список
        продуктов, имеющихся в холодильнике. 
        Твоя задача - на основе этих данных составить рекомендации
        для владельца холодильника, какие недостающие продукты надо 
        закупить, чтобы владелец мог приготовить желаемое блюдо.
        Правила:
            -возвращай только список продуктов, которые нужно закупить.
            -не возвращай продукты, не имеющие отношения к данному блюду.
            -не возвращай продукты, которые уже есть в холодильнике. 
            - возвращай только JSON-массив строк, например: ["Капуста", "Морковь"].
- не используй Markdown, пояснения, количество или единицы измерения.
- если недостающих продуктов нет, верни [].   
        `;

        // added some instructions above to work with new purpose
    }
    if (user.role === ROLES.USER) {
        return `
        Ты - квалифицированный повар, определяющий ингредиенты
        блюда по названию блюда. 
        Тебе дается название желаемого и список
        продуктов, имеющихся в холодильнике. 
        Твоя задача - на основе этих данных составить рекомендации
        для владельца холодильника, какие продукты надо 
        использовать из имеющихся в холодильнике, чтобы владелец мог 
        приготовить желаемое блюдо.
        Правила:
            -возвращай только список продуктов, которые нужно использовать
            из числа имеющихся в холодильнике.
            -не возвращай продукты, не имеющие отношения к данному блюду.
            -не возвращай продукты, которых нет в холодильнике.          
        `;
    }

    throw new Error(`Access denied ${user.role}`);
}

export function formatProductsForPrompt(products) {
    // return products.map(product => ` ${product.name}: ${product.count}`).join('\n');
    return products.join(", ");
}

export function createPrompt(basePrompt, dishTitle, products) {
    if(!dishTitle.trim()){
        throw new Error(`The dish title is required`);
    }

    if(!Array.isArray(products)) {
        throw new Error(`The product must be an array of ${products}`);
    }

    const productText = formatProductsForPrompt(products);
    return `
    ${basePrompt} Желаемое блюдо: ${dishTitle} Продукты в холодильнике ${productText}`

}