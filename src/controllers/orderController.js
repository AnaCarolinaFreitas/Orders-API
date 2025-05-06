const orderModel = require("../models/orderModel");

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching Orders:", error);
        res.status(500).json({error: "Internal server error"});
    };
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({error: "Order not found"});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({error: "Order not found"});
    }
};

const createOrder = async (req,res) => {
    try {
        const {product, price, client_id} = req.body;
        const newOrder = await orderModel.createOrder(product, price, client_id);
        res.status(201).json(newOrder);
    } catch (error) {
        if (error.code === "23505") {
            res.status(409).json({error: "This order already exists"});
        }
        res.status(500).json({eror: "Error creating order"});
    }
};

const updateOrder = async (req, res) => {
    try {
        const {product, price, client_id} = req.body;
        const updatedOrder = await orderModel.updateOrder(req.params.id, product, price, client_id);
        if (!updatedOrder) {
            return res.status(404).json({error: "Order not found"});
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({error: "Error updating Order"});
    }
};

const deleteOrder = async (req,res) => {
    try {
        const deletedOrder = await orderModel.deleteOrder(req.params.id);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(404).json({error: "Error deleting order"})
    }
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };