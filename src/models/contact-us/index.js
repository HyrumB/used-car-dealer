import dbClient from "../index.js";

async function addMessage(name, email, message) {
  const db = dbClient;
  return await db.query(
    "INSERT INTO messages (message_sender, message_sender_email, message_content) VALUES ($1, $2, $3)",
    [name, email, message]
  );
}

export { addMessage };
