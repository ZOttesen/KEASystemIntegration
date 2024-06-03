import express from "express";
import mongoose from "mongoose";
import Order from "./models/order.js"; // Import the order model

const app = express();
app.use(express.json());
const PORT = 8080;
const mongoUri = "mongodb://localhost:27017"; // Replace with your connection string

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(console.error);

app.post("/order", async (req, res) => {
    try {
        const { orderID, webhook } = req.body; // Destructure the order and age from the request body
        const status = "pending"; // Set the status to pending
        const newOrder = await Order.create({ orderID, status, webhook });
        console.log(newOrder); // Log the new order
        res.status(201).json(newOrder); // Send back the created order with a 201 status code
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal Server Error for any errors
    }
});


app.post("/delete", async (req, res) => {
    const {orderID, webhook} = req.body; // Destructure the order and age from the request body
    let newDelete;
    try {
        newDelete = await Order.deleteOne({orderID, webhook});
        if (newDelete.deletedCount === 0) {
            console.log("No document found with the specified id and and webhook.");
        } else {
            console.log("Document deleted successfully.");
        }
    } catch (error) {
        console.error("Error deleting the document:", error);
    }
    res.status(201).json(newDelete)
})

app.get("/ping", async (req, res) => {
    console.log("ping");
    try {
        const distinctNames = await Order.distinct("webhook"); // Assuming "Order" is defined elsewhere
        for (const name of distinctNames) {
            (async (name) => { // Immediatly Invoked Function Expression (IIFE) to handle each request separately
                try {
                    await fetch(name, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ping: "ping"})
                    });
                } catch (error) {
                    console.error(`Error sending ping to ${name}:`, error);
                }
            })(name);
        }
    } catch (error) {
        console.error("Error fetching distinct names:", error);
    }
    res.status(201).json("Ping success"); // Send response after initiating all requests
});

app.post("/admin/changeStatus", async (req, res) => {
    try {
        const { orderID, status , webhook } = req.body; // Destructure the order and age from the request body
        const newOrder = await Order.updateOne({ orderID, webhook }, {status});
        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({orderID, status})
        });

        console.log(newOrder); // Log the new order
        res.status(201).json(newOrder); // Send back the created order with a 201 status code
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal Server Error for any errors
    }
});

app.post("/admin/test", (req, res) => {
    console.log(req.body);
    res.sendStatus(204);
})

app.listen(PORT, () => console.log(`Server is running on port https://localhost:${PORT}`))