import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function TicketDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

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
          Authorization: `Bearer ${token}`,
        },
      });

      setTicket(res.data.ticket);
      setComments(res.data.comments);

    } catch (error) {

      alert("Failed to fetch ticket");

    }

  };

  const addComment = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        `/tickets/${id}/comments`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");

      fetchTicket();

    } catch (error) {

      alert("Failed to add comment");

    }

  };

  const getStatusColor = (status) => {

    if (status === "OPEN") return "bg-yellow-500";
    if (status === "IN_PROGRESS") return "bg-blue-500";
    if (status === "RESOLVED") return "bg-green-500";

    return "bg-gray-500";

  };

  if (!ticket) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <p className="text-xl">Loading...</p>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 border border-zinc-700 px-5 py-2 rounded-xl hover:bg-zinc-900 transition"
        >
          Back
        </button>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

          <div className="flex justify-between items-start mb-6">

            <div>

              <h1 className="text-4xl font-bold mb-3">
                {ticket.title}
              </h1>

              <p className="text-gray-400 leading-relaxed">
                {ticket.description}
              </p>

            </div>

            <span
              className={`${getStatusColor(ticket.status)} px-4 py-2 rounded-full text-sm`}
            >
              {ticket.status}
            </span>

          </div>

          <div className="mt-12">

            <h2 className="text-2xl font-semibold mb-6">
              Comments
            </h2>

            <div className="space-y-5">

              {comments.map((comment, index) => (

                <div
                  key={index}
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5"
                >

                  <p className="font-semibold mb-2">
                    {comment.name}
                  </p>

                  <p className="text-gray-300">
                    {comment.message}
                  </p>

                </div>

              ))}

            </div>

          </div>

          <div className="mt-12">

            <h2 className="text-2xl font-semibold mb-5">
              Add Comment
            </h2>

            <textarea
              rows="4"
              placeholder="Write your comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-2xl p-5 outline-none resize-none"
            />

            <button
              onClick={addComment}
              className="mt-5 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Submit Comment
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TicketDetails;