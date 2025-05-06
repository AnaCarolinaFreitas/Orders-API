const pool = require("../config/database");

const getClient = async () => {
    const result = await pool.query(`SELECT clients.*, orders.product FROM clients LEFT JOIN orders ON clients.past_orders = orders.id`, [id]);

    return result.rows;
};

const getClientById = async (id) => {
    const result = await pool.query(`SELECT clients.*, orders.product FROM clients LEFT JOIN orders ON clients.past_orders = orders.id WHERE clients.id = $1`, [id]);
    return result.rows[0];
};

const createClient = async (name, profile, past_orders) => {
    const result = await pool.query(
        "INSERT INTO clients (name, profile, past_orders) VALUES ($1, $2, $3) RETURNING *",
        [name, profile, past_orders]
    );
    return result.rows[0]
};

const updateClient = async (name, profile) => {
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

module.exports = { getClient, getClientById, createClient, updateClient, deleteClient};
