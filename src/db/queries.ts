import pool from "./pool";

export async function createUser(
  firstName: string,
  lastName: string,
  username: string,
  hashedPassword: string,
): Promise<void> {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, hashedPassword],
  );
}

export async function getMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id, messages.title, messages.text, messages.timestamp, users.username
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.timestamp DESC`,
  );
  return rows;
}

export async function addMessage(
  title: string,
  text: string,
  authorId: number,
  date: Date,
): Promise<void> {
  await pool.query(
    "INSERT INTO messages (title, text, user_id, timestamp) VALUES ($1, $2, $3, $4)",
    [title, text, authorId, date],
  );
}

export async function makeMember(userId: number): Promise<void> {
  await pool.query("UPDATE users SET membership_status = TRUE WHERE id = $1", [
    userId,
  ]);
}

export async function makeAdmin(userId: number): Promise<void> {
  await pool.query("UPDATE users SET admin_status = TRUE WHERE id = $1", [
    userId,
  ]);
}

export async function deleteMessage(messageId: string): Promise<void> {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}
