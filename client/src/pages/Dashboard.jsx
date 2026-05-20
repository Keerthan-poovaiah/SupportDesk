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
          Authorization: `Bearer ${token}`,
        },
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

  const getStatusColor = (status) => {

    if (status === "OPEN") return "bg-yellow-500";
    if (status === "IN_PROGRESS") return "bg-blue-500";
    if (status === "RESOLVED") return "bg-green-500";

    return "bg-gray-500";

  };

  return (

    <div className="min-h-screen bg-black text-white">

      <div className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">

        <h1 className="text-3xl font-bold">
          SupportDesk
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/create-ticket")}
            className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:opacity-90"
          >
            Create Ticket
          </button>

          <button
            onClick={handleLogout}
            className="border border-zinc-700 px-5 py-2 rounded-xl hover:bg-zinc-900"
          >
            Logout
          </button>

        </div>

      </div>

      <div className="px-10 py-10">

        <h2 className="text-4xl font-bold mb-3">
          Dashboard
        </h2>

        <p className="text-gray-400 mb-10">
          Manage and track support tickets efficiently.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tickets.map((ticket) => (

            <div
              key={ticket.id}
              onClick={() => navigate(`/ticket/${ticket.id}`)}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl cursor-pointer hover:border-zinc-600 transition"
            >

              <div className="flex justify-between items-start mb-5">

                <h3 className="text-xl font-semibold">
                  {ticket.title}
                </h3>

                <span
                  className={`${getStatusColor(ticket.status)} px-3 py-1 rounded-full text-sm`}
                >
                  {ticket.status}
                </span>

              </div>

              <p className="text-gray-400 line-clamp-3">
                {ticket.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;