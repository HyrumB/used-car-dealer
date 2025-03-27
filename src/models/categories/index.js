import dbClient from "../../models/index.js";

const addCategory = async (category) => {
    const db = await dbClient;
    return await db.query('INSERT INTO category (category_name) VALUES (?)', category);
};

const getCategories = async () => {
    const db = await dbClient;
    return await db.query('SELECT * FROM category');
};





export {addCategory, getCategories};