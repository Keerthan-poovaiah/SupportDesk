const pool = require('../config/db');
const { createTicketSchema } = require('../validation/ticketValidation');

exports.createTicket = async (req, res) => {

    try {

        const { title, description, priority } = req.body;

        const { error } = createTicketSchema.validate({ title, description, priority });

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

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

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || "";

        const userId = req.user.userId;
        const role = req.user.role;

        let query;
        let values;

        if (role === "admin") {

            query = `
            SELECT *
            FROM tickets
            WHERE title ILIKE $1
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
            `;

            values = [`%${search}%`, limit, offset];

        } else if (role === "agent") {

            query = `
            SELECT *
            FROM tickets
            WHERE assigned_agent_id = $1
            AND title ILIKE $2
            ORDER BY created_at DESC
            LIMIT $3 OFFSET $4
            `;

            values = [userId, `%${search}%`, limit, offset];

        } else {

            query = `
            SELECT *
            FROM tickets
            WHERE customer_id = $1
            AND title ILIKE $2
            ORDER BY created_at DESC
            LIMIT $3 OFFSET $4
            `;

            values = [userId, `%${search}%`, limit, offset];

        }

        const result = await pool.query(query, values);

        res.json({
            page,
            limit,
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
        const { userId, role } = req.user;

        const allowedStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid ticket status"
            });
        }

        if (role !== "admin" && role !== "agent") {
            return res.status(403).json({
                message: "You are not authorized to update ticket status"
            });
        }

        const ticketResult = await pool.query(
            "SELECT * FROM tickets WHERE id = $1",
            [ticketId]
        );

        if (ticketResult.rows.length === 0) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        const ticket = ticketResult.rows[0];

        if (
            role === "agent" &&
            ticket.assigned_agent_id !== userId
        ) {
            return res.status(403).json({
                message: "You can only update tickets assigned to you"
            });
        }

        const result = await pool.query(
            `UPDATE tickets
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, ticketId]
        );

        res.json({
            message: "Ticket status updated successfully",
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


exports.assignTicket = async (req, res) => {

    try {

        const ticketId = req.params.id;
        const { agentId } = req.body;
        const role = req.user.role;

        if (role !== "admin") {
            return res.status(403).json({
                message: "Only admins can assign tickets"
            });
        }

        const query = `
        UPDATE tickets
        SET assigned_agent_id = $1
        WHERE id = $2
        RETURNING *
        `;

        const result = await pool.query(query, [agentId, ticketId]);

        res.json({
            message: "Ticket assigned successfully",
            ticket: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};