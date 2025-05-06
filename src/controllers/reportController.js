const PDFDocument = require("pdfkit");

const orderModel = require("../models/orderModel");
const clientModel = require("../models/clientModel");

const exportOrderPdf = async (req,res) => {
    try {
        const orders = await orderModel.getOrders();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=orders.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Lista de Pedidos", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text("id | Produto | Preco | Comprador", {underline: true});
        doc.moveDown(0.5);

        orders.forEach((order) => {
            doc.text(
                `${order.id} | ${order.product} | ${order.price} | ${order.client_id} `
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"});
    }
};

const exportClientsPdf = async (req,res) => {
    try {
        const clients = await clientModel.getClient();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=clients.pdf")

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Lista de Pedidos", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text("id | Produto | Preco | Comprador", {underline: true});
        doc.moveDown(0.5);

        clients.forEach((client) => {
            doc.text(
                `${client.id} | ${client.name} | ${client.profile}`
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"});
    }
};

module.exports = { exportOrderPdf, exportClientsPdf };