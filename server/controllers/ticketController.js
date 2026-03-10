const pool = require('../config/db');

exports.createTicket = async (req, res) => {

    try {

        const { title, description, priority } = req.body;

        const customerId = req.user.userId;

        const query = `
        INSERT INTO tickets (title, description, priority, customer_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;

        const values = [title, description, priority, customerId];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: "Ticket created successfully",
            ticket: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


exports.getTickets = async (req, res) => {

    try {

        const userId = req.user.userId;
        const role = req.user.role;

        let query;
        let values;

        if (role === "admin") {

            query = "SELECT * FROM tickets";
            values = [];

        } else if (role === "agent") {

            query = "SELECT * FROM tickets WHERE assigned_agent_id = $1";
            values = [userId];

        } else {

            query = "SELECT * FROM tickets WHERE customer_id = $1";
            values = [userId];

        }

        const result = await pool.query(query, values);

        res.json({
            tickets: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};