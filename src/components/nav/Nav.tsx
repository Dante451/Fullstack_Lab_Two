import React from "react";
import { Link } from "react-router-dom";

export function Nav(): JSX.Element {
  return (
    <nav style={{ padding: ".75rem 1rem", borderBottom: "1px solid #eee" }}>
      <div className="links" style={{ display: "flex", gap: "1rem" }}>
        <span>
          <Link to="/employees">Employees</Link>
        </span>
        <span>
          <Link to="/organization">Organization</Link>
        </span>
      </div>
    </nav>
  );
}
