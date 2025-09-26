import "./App.css";
import { Nav } from "./components/nav/Nav";
import { EmployeeList } from "./components/employee-list/EmployeeList";
import { Footer } from "./components/footer/footer";
import Header from "./components/header/Header";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Organization from "./components/organization/Organization"; // default export

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Header />

      {/* Staff toggle buttons */}
      <StaffToggle />

      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/leadership" element={<Organization />} />
        {/* You can keep /organization if you want */}
        <Route path="/" element={<Navigate to="/employees" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

// Component for switching between Employees and Leadership
const StaffToggle: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEmployees = location.pathname === "/employees";
  const isLeadership = location.pathname === "/leadership";

  return (
    <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
      <button
        onClick={() => navigate("/employees")}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: isEmployees ? "#007bff" : "#eee",
          color: isEmployees ? "#fff" : "#000",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Employees
      </button>
      <button
        onClick={() => navigate("/leadership")}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: isLeadership ? "#007bff" : "#eee",
          color: isLeadership ? "#fff" : "#000",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Leadership
      </button>
    </div>
  );
};

export default App;
