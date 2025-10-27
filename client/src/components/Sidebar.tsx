import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/profile", label: "Profile" },
    { to: "/users", label: "Users" },
    { to: "/play", label: "Play" },
    { to: "/stats", label: "Statistics" }
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">🎮 Game Tracker</h1>
      <nav className="flex flex-col gap-3">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }: { isActive: boolean }) =>
              `px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
