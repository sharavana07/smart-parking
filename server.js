require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "parking_system",
    password: "20150",
    port: 5432,
});
app.post("/update_slot", async (req, res) => {
    try {
        const { slot_id, distance, status } = req.body;

        // Basic Validation
        if (!slot_id || distance === undefined || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Update Query
        const result = await pool.query(
            "UPDATE parking_slots SET distance = $1, status = $2, updated_at = NOW() WHERE slot_id = $3 RETURNING *",
            [distance, status, slot_id]
        );

        // Check if the slot was updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Slot not found" });
        }

        res.json({ message: "Slot Updated!", updatedSlot: result.rows[0] });

    } catch (err) {
        console.error("❌ Error updating slot:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ✅ Fetch parking slots
app.get("/get_slots", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM parking_slots ORDER BY slot_id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// ✅ Serve index.html on root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ Start server on PORT 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
