import dbClient from "../../models/index.js";

const addCategory = async (category_name, category_description, image_path) => {
    const db = await dbClient;
    return await db.query('INSERT INTO category (category_name, category_description, image_path) VALUES ($1, $2, $3)', [category_name, category_description, image_path]);
};

const getCategories = async () => {
    const db = await dbClient;
    return await db.query('SELECT * FROM category');
};

const getCategoryContent = async (vehicle_id) => {
    const db = await dbClient;
    return await db.query('SELECT * FROM vehicles WHERE vehicle_category_id = $1', [vehicle_id]);
};

export {addCategory, getCategories, getCategoryContent};