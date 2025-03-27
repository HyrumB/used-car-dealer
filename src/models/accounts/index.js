import dbClient from "../../models/index.js";

const registerUser = async (user_name, user_email, user_password) => {
    const db = await dbClient;
    return await db.query(
        'INSERT INTO "user" (user_name, user_email, user_password, role_id) VALUES ($1, $2, $3, (SELECT role_id FROM user_roles WHERE role_name = \'regular_user\')) RETURNING *',
        [user_name, user_email, user_password]
    );
};

const elevateUser = async (user_id) => {
    const db = await dbClient;
    return await db.query(
        'UPDATE "user" SET role_id = (SELECT role_id FROM user_roles WHERE role_name = \'admin\') WHERE user_id = $1 RETURNING *',
        [user_id]
    );
};

const checkUserExists = async (email) => {
    const db = await dbClient;
    return await db.query('SELECT * FROM "user" WHERE user_email = $1', [email]);
};

export { registerUser, elevateUser, checkUserExists };