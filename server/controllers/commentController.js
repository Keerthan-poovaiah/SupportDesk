const pool = require('../config/db');

exports.addComment = async (req, res) => {

    try {

        const ticketId = req.params.ticketId;
        const { message } = req.body;
        const userId = req.user.userId;

        const query = `
        INSERT INTO ticket_comments (ticket_id, user_id, message)
        VALUES ($1, $2, $3)
        RETURNING *
        `;

        const values = [ticketId, userId, message];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: "Comment added",
            comment: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};