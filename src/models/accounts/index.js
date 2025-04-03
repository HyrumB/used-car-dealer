import dbClient from "../../models/index.js";
import bcrypt from "bcrypt";

const registerUser = async (user_name, user_email, user_password) => {
  const hashed_password = await bcrypt.hash(user_password, 10);
  try {
    let dbresponse = await db.query(
      "INSERT INTO \"user\" (user_name, user_email, user_password, role_id) VALUES ($1, $2, $3, (SELECT role_id FROM user_roles WHERE role_name = 'regular_user')) RETURNING *",
      [user_name, user_email, hashed_password]
    );
    return dbresponse;
  } catch (error) {
    console.log(error);
  }
};

const elevateUser = async (user_id) => {
  try {
    let dbresponse = await dbClient.query(
      "UPDATE \"user\" SET role_id = (SELECT role_id FROM user_roles WHERE role_name = 'admin') WHERE user_id = $1 RETURNING *",
      [user_id]
    );
    return dbresponse;
  } catch (error) {
    console.log(error);
  }
};

const checkUserExists = async (email) => {
  try {
    let dbresponse = await dbClient.query(
      'SELECT * FROM "user" WHERE user_email = $1',
      [email]
    );
    return dbresponse.rows;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (user_id) => {
  try {
    let dbresponse = await dbClient.query(
      'SELECT * FROM "user" WHERE user_id = $1',
      [user_id]
    );
    return dbresponse.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, elevateUser, checkUserExists, getUserById };
