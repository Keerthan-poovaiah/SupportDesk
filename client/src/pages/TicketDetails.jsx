import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

function TicketDetails() {

  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {

    navigate("/");

  } else {

    fetchTicket();

  }

}, []);

  const fetchTicket = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await api.get(`/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTicket(res.data.ticket);
      setComments(res.data.comments);

    } catch (error) {

      alert("Failed to load ticket");

    }

  };

  const addComment = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        `/tickets/${id}/comments`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("");

      fetchTicket();

    } catch (error) {

      alert("Failed to add comment");

    }

  };

  if (!ticket) return <p>Loading...</p>;

  return (

    <div style={{ padding: "30px" }}>

      <h2>{ticket.title}</h2>

      <p>{ticket.description}</p>

      <p>Status: {ticket.status}</p>

      <h3>Comments</h3>

      <ul>

        {comments.map((comment) => (

          <li key={comment.created_at}>
            <strong>{comment.name}</strong>: {comment.message}
          </li>

        ))}

      </ul>

      <h4>Add Comment</h4>

      <input
        placeholder="Write comment"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={addComment}>
        Submit
      </button>

    </div>

  );

}

export default TicketDetails;