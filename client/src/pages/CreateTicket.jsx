import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateTicket() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/tickets",
        {
          title,
          description,
          priority
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Ticket created successfully");

      navigate("/dashboard");

    } catch (error) {

      alert("Failed to create ticket");

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h2>Create Ticket</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <select
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit}>
        Submit Ticket
      </button>

    </div>

  );
}

export default CreateTicket;