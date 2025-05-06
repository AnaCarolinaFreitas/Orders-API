const pool = require("../config/database");

const getClient = async () => {
    const result = await pool.query("SELECT * FROM clients");
    return result.rows;
};

const getClientById = async (id) => {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [id]);
    return result.rows[0];
};

const createClient = async (name, profile) => {
    const result = await pool.query(
        "INSERT INTO clients (name, profile) VALUES ($1, $2) RETURNING *",
        [name, profile]
    );
    return result.rows[0];
};

const updateClient = async (id, name, profile) => {
    const result = await pool.query(
        "UPDATE clients SET name = $1, profile = $2 WHERE id = $3 RETURNING *",
        [name, profile, id]
    );
    return result.rows[0];
};

const deleteClient = async (id) => {
    const result = await pool.query("DELETE FROM clients WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        throw new Error("Client not found");
    }
    return result.rows[0];
};

module.exports = { getClient, getClientById, createClient, updateClient, deleteClient };
