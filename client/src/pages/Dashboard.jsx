import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {

    navigate("/");

  } else {

    fetchTickets();

  }

}, []);

  const fetchTickets = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await api.get("/tickets", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTickets(res.data.tickets);

    } catch (error) {

      alert("Failed to fetch tickets");

    }

  };

  const handleLogout = () => {

  localStorage.removeItem("token");

  navigate("/");

};

  return (

    <div>

      <h2>Dashboard</h2>

      <button onClick={handleLogout}>
      Logout
      </button>

      <button onClick={() => navigate("/create-ticket")}>
        Create Ticket
      </button>

      <ul>

        {tickets.map((ticket) => (

          <li
            key={ticket.id}
            onClick={() => navigate(`/ticket/${ticket.id}`)}
            style={{ cursor: "pointer", margin: "10px 0" }}
          >

            <strong>{ticket.title}</strong> - {ticket.status}

          </li>

        ))}

      </ul>

    </div>

  );

}

export default Dashboard;