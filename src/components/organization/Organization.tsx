import React, { useState } from "react";
import leadership from "../../data/leadership.json";

interface Leader {
  id: number;
  role: string;
  name: string;
  description: string;
}

export default function Organization(): JSX.Element {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <main style={{ padding: "1rem" }}>
      <h1 style={{ marginBottom: ".75rem" }}>Organization &amp; Leadership</h1>

      <div>
        {(leadership as Leader[]).map((l) => (
          <section
            key={l.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              onClick={() => toggle(l.id)}
              role="button"
              aria-expanded={expandedId === l.id}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{l.role}</strong> — <span>{l.name}</span>
              </div>
              <div style={{ marginLeft: "1rem" }}>
                {expandedId === l.id ? "▲" : "▼"}
              </div>
            </div>

            {expandedId === l.id && (
              <div style={{ marginTop: ".6rem", color: "#333" }}>
                {l.description}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
