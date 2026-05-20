import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateTicket() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/");

    }

  }, []);

  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/tickets",
        {
          title,
          description,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ticket created successfully");

      navigate("/dashboard");

    } catch (error) {

      alert("Failed to create ticket");

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold mb-3">
          Create Ticket
        </h1>

        <p className="text-gray-400 mb-10">
          Submit a support request for tracking and resolution.
        </p>

        <div className="space-y-6">

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter ticket title"
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-xl p-4 outline-none"
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Description
            </label>

            <textarea
              rows="6"
              placeholder="Describe the issue..."
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-xl p-4 outline-none resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>

          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Priority
            </label>

            <select
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-white rounded-xl p-4 outline-none"
              onChange={(e) => setPriority(e.target.value)}
            >

              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>

            </select>

          </div>

          <div className="flex gap-4 pt-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full border border-zinc-700 py-4 rounded-xl hover:bg-zinc-800 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Submit Ticket
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CreateTicket;