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


exports.updateTicketStatus = async (req, res) => {

    try {

        const ticketId = req.params.id;
        const { status } = req.body;
        const role = req.user.role;

        if (role === "customer") {
            return res.status(403).json({
                message: "Customers cannot update ticket status"
            });
        }

        const query = `
        UPDATE tickets
        SET status = $1
        WHERE id = $2
        RETURNING *
        `;

        const values = [status, ticketId];

        const result = await pool.query(query, values);

        res.json({
            message: "Ticket status updated",
            ticket: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


exports.getTicketDetails = async (req, res) => {

    try {

        const ticketId = req.params.id;

        const ticketQuery = `
        SELECT * FROM tickets
        WHERE id = $1
        `;

        const ticketResult = await pool.query(ticketQuery, [ticketId]);

        const commentsQuery = `
        SELECT ticket_comments.message, users.name, ticket_comments.created_at
        FROM ticket_comments
        JOIN users
        ON ticket_comments.user_id = users.id
        WHERE ticket_comments.ticket_id = $1
        ORDER BY ticket_comments.created_at
        `;

        const commentsResult = await pool.query(commentsQuery, [ticketId]);

        res.json({
            ticket: ticketResult.rows[0],
            comments: commentsResult.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};