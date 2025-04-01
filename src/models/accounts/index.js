import dbClient from "../../models/index.js";
import bcrypt from "bcrypt";


const registerUser = async (user_name, user_email, user_password) => {
    const hashed_password = await bcrypt.hash(user_password, 10);
    return await db.query(
        'INSERT INTO "user" (user_name, user_email, user_password, role_id) VALUES ($1, $2, $3, (SELECT role_id FROM user_roles WHERE role_name = \'regular_user\')) RETURNING *',
        [user_name, user_email, hashed_password]
    );
};

const elevateUser = async (user_id) => {
    return await dbClient.query(
        'UPDATE "user" SET role_id = (SELECT role_id FROM user_roles WHERE role_name = \'admin\') WHERE user_id = $1 RETURNING *',
        [user_id]
    );
};

const checkUserExists = async (email) => {
    return await dbClient.query('SELECT * FROM "user" WHERE user_email = $1', [email]);
};

const getUserById = async (user_id) => {
    console.log(user_id);
    const dbresponse = await dbClient.query('SELECT * FROM "user" WHERE user_id = $1', [user_id]);
    console.log(dbresponse.rows[0]);
    return dbresponse.rows[0];
};

export { registerUser, elevateUser, checkUserExists, getUserById };