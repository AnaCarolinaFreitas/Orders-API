const pool = require("../config/database.js");

const getOrders = async (price) => {
    try {
        if (price && price.trim()) {
            const result = await pool.query(
                "SELECT orders.*, clients.name AS client_name FROM orders LEFT JOIN clients ON orders.client_id = clients.id WHERE CAST(orders.price AS TEXT) ILIKE $1",
                [`%${price.trim()}%`]
            );
            return result.rows;
        } else {
            const result = await pool.query(
                "SELECT orders.*, clients.name AS client_name FROM orders LEFT JOIN clients ON orders.client_id = clients.id"
            );
            return result.rows;
        }
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        throw error;
    }
};

const getOrderById = async (id) => {
    const result = await pool.query(`SELECT orders.*, clients.name AS client_name FROM orders LEFT JOIN clients ON orders.client_id = clients.id WHERE orders.id = $1`, [id]);
return result.rows[0];
};

const createOrder = async (product, price, client_id) => {
    const result = await pool.query(
        "INSERT INTO orders (product, price, client_id) VALUES ($1, $2, $3) RETURNING *",
        [product, price, client_id]
    );
    return result.rows[0];
};

const updateOrder = async (id, product, price, client_id) => {
    const result = await pool.query(
        "UPDATE orders SET product = $1, price = $2, client_id = $3 WHERE id = $4 RETURNING *",
        [product, price, client_id, id]
    );
    return result.rows[0];
};

const deleteOrder = async (id) => {
    const result = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0){
        throw new Error("Order not found");
    }
    return result.rows[0];
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };