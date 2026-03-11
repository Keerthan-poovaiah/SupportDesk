import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TicketDetails from "./pages/TicketDetails";
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket/:id" element={<TicketDetails />} />
        <Route path="/create-ticket" element={<CreateTicket />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;