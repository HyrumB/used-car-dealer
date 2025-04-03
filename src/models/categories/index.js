import dbClient from "../../models/index.js";

const editCategory = async (category_id, category_name, category_description, image_path) => {
    return await dbClient.query('UPDATE category SET category_name = $1, category_description = $2, image_path = $3 WHERE category_id = $4', [category_name, category_description, image_path, category_id]);
};

const addCategory = async (category_name, category_description, image_path) => {
    return await dbClient.query('INSERT INTO category (category_name, category_description, image_path) VALUES ($1, $2, $3)', [category_name, category_description, image_path]);
};

const getCategories = async () => {
    try {
        let dbresponse = await dbClient.query('SELECT * FROM category');
        return dbresponse.rows;
    } catch (error) {
        console.log(error);
    }
};

const getCategory = async (category_id) => {
    try {
        let dbresponse = await dbClient.query('SELECT * FROM category WHERE category_id = $1', [category_id]);
        return dbresponse.rows;
    } catch (error) {
        console.log(error);
    }
};

const getCategoryContent = async (vehicle_id) => {
    try {
        let dbresponse = await dbClient.query('SELECT * FROM vehicles WHERE category_id = $1', [vehicle_id]);
        return dbresponse.rows;
    } catch (error) {
        console.log(error);
    }

    
    return 
};

export {addCategory, getCategories, getCategory, getCategoryContent, editCategory};