import dbClient from "../../models/index.js";

const addVehicle = async (vehicle_name, vehicle_description, image_path, vehicle_price, vehicle_owner_id, category_id
) => {
  try {
    const result = await dbClient.query(
      "INSERT INTO vehicles (vehicle_name, vehicle_description, image_path, vehicle_price, vehicle_owner_id, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING vehicle_id",
      [ vehicle_name, vehicle_description, image_path, vehicle_price, vehicle_owner_id, category_id]
    );
    return result.rows[0].vehicle_id; // Returns the ID of the newly inserted vehicle
  } catch (error) {
    console.error("Error inserting vehicle:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

async function getVehicleContent(id) {
  const dbresponse = await dbClient.query(
    "SELECT * FROM vehicles WHERE vehicle_id = $1",
    [id]
  );

  if (dbresponse.rows[0].vehicle_id != id || dbresponse.rows === undefined) {
    error("No vehicle found with id " + id);
  }

  return dbresponse.rows[0];
}

const getVehiclesByUser = async (user_id) => {
  try {
    let dbresponse = await dbClient.query(
      "SELECT * FROM vehicles WHERE vehicle_owner_id = $1",
      [user_id]
    );
    return dbresponse.rows;
  } catch (error) {
    console.log(error);
  }
}

const getAllVehicles = async () => {
  try {
    let dbresponse = await dbClient.query("SELECT * FROM vehicles");
    return dbresponse.rows;
  } catch (error) {
    console.log(error);
  }
}

const editVehicle = async (vehicle_id, vehicle_name, vehicle_description, image_path, vehicle_price, category_id) => {
  try {

    if (image_path !== undefined && image_path !== null) {

      let dbresponse = await dbClient.query(
        "UPDATE vehicles SET vehicle_name = $1, vehicle_description = $2, image_path = $3, vehicle_price = $4, category_id = $5 WHERE vehicle_id = $6",
        [vehicle_name, vehicle_description, image_path, vehicle_price, category_id, vehicle_id]
      );
      return dbresponse;

    } else {
      let dbresponse = await dbClient.query(
        "UPDATE vehicles SET vehicle_name = $1, vehicle_description = $2, vehicle_price = $3, category_id = $4 WHERE vehicle_id = $5",
        [vehicle_name, vehicle_description, vehicle_price, category_id, vehicle_id]
      );
      return dbresponse;
    }

  } catch (error) {
    console.log(error);
  }
};

const deleteVehicleById = async (id) => {
  try {
    let dbresponse = await dbClient.query(
      "DELETE FROM vehicles WHERE vehicle_id = $1",
      [id]
    );
    return dbresponse.rows;
  } catch (error) {
    console.log(error);
  }
}

export { getVehicleContent, addVehicle, getVehiclesByUser, getAllVehicles, deleteVehicleById, editVehicle };
