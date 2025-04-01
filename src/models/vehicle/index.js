import dbClient from "../../models/index.js";

async function getVehicleContent(id) {
  const dbresponse =  await dbClient.query(
    "SELECT * FROM vehicles WHERE vehicle_id = $1",
    [id]
  );

  if (dbresponse.rows[0].vehicle_id != id || dbresponse.rows === undefined) {
    error("No vehicle found with id " + id);
  }

  return dbresponse.rows[0];
}

export { getVehicleContent };
