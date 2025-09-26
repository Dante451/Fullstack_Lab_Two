import React, { useMemo, useState } from "react";
import employeesJson from "../../data/employees.json";

export function EmployeeList(): JSX.Element {
  const [search, setSearch] = useState("");
  const deptEntries = Object.entries(employeesJson.departments) as [
    string,
    string[]
  ][];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return deptEntries.map(([department, employees]) => ({
        department: department.replace(/([a-z])([A-Z])/g, "$1 $2"),
        employees,
      }));
    }

    return deptEntries
      .map(([department, employees]) => {
        const prettyDepartment = department.replace(/([a-z])([A-Z])/g, "$1 $2");
        const matchesDepartment =
          prettyDepartment.toLowerCase().includes(q) ||
          department.toLowerCase().includes(q);

        const matchingEmployees = employees.filter((name) =>
          name.toLowerCase().includes(q)
        );

        if (matchesDepartment) {
          return { department: prettyDepartment, employees };
        }

        if (matchingEmployees.length) {
          return { department: prettyDepartment, employees: matchingEmployees };
        }
        return null;
      })
      .filter(Boolean) as { department: string; employees: string[] }[];
  }, [search, deptEntries]);

  return (
    <main style={{ padding: "1rem" }}>
      <h1 style={{ marginBottom: ".5rem" }}>Employees</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by employee name or department (real time)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: ".5rem",
            width: "100%",
            maxWidth: 520,
            boxSizing: "border-box",
          }}
        />
      </div>

      <div>
        {filtered.length === 0 && (
          <p>No results. Try a different search term.</p>
        )}

        {filtered.map((d, idx) => (
          <section
            key={idx}
            style={{
              marginBottom: ".75rem",
              border: "1px solid #eee",
              padding: ".6rem",
              borderRadius: 8,
            }}
          >
            <h2 style={{ margin: ".25rem 0" }}>{d.department}</h2>
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>
              {d.employees.map((emp, i) => (
                <li key={i} className="employee" style={{ marginBottom: ".25rem" }}>
                  {emp}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
