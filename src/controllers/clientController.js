const clientModel = require("../models/clientModel");

const getClient = async (req, res) => {
    try{
        const { name } = req.query;
        const clients = await clientModel.getClient(name);
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({error: "Error searching clients"});
    }
};

const getClientById = async (req, res) => {
    try {
        const client = await clientModel.getClientById(req.params.id);
        if (!client) {
            return res.status(404).json({error: "Client not found"})
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({error: "Client not found"});
    }
};

const createClient = async (req,res) => {
    try{
        const {name, past_orders} = req.body;
        const profile = req.file ? req.file.filename : null;
        const newClient = await clientModel.createClient(name, past_orders, profile);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({message: "Error creating client"});
    }
};

const updateClient = async (req, res) => {
    try{
        const { name, profile, past_orders } =req.body;
        const updatedClient = await clientModel.updateClient(req.params.id, name, profile, past_orders);
        if (!updateClient) {
            return res.status(404).json({error: "Client not found"});
        }
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: "Error updating hero"})
    }
};

const deleteClient = async (req, res) => {
    try {
        const deletedClient = await clientModel.deleteClient(req.params.id);
        res.status(200).json(deletedClient)
    } catch (error) {
        res.status(404).json({ error: "Error deleting client"});
    }
};

module.exports = { getClient, getClientById, createClient, updateClient, deleteClient };
 
