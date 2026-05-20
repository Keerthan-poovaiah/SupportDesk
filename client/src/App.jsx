import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-ticket" element={<CreateTicket />} />

        <Route path="/ticket/:id" element={<TicketDetails />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;