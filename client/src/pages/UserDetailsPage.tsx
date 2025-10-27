import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<{ game: string; minutes: number; percent: number }[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://localhost:4000/api/users/${id}`);
      setUser(res.data);

      const sessions = res.data.sessions;
      const totals: Record<string, number> = {};
      let totalMinutes = 0;

      sessions.forEach((s: any) => {
        if (!s.minutes) return;
        totals[s.game.name] = (totals[s.game.name] || 0) + s.minutes;
        totalMinutes += s.minutes;
      });

      const arr = Object.entries(totals).map(([game, minutes]) => ({
        game,
        minutes,
        percent: totalMinutes ? Math.round((minutes / totalMinutes) * 100) : 0
      }));
      setStats(arr);
    })();
  }, [id]);

  if (!user) return <div className="p-6">Loading user data...</div>;

  return (
    <div className="p-6 space-y-4">
      <button onClick={() => navigate("/users")} className="text-blue-600 underline">
        ← Back to Users
      </button>

      <div className="flex items-center gap-4">
        <img
          src={`http://localhost:4000${user.profilePic}`}
          alt={user.firstName}
          className="w-24 h-24 object-cover rounded-full shadow"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Game Statistics</h3>
        {stats.length === 0 && <p>No sessions found.</p>}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Game</th>
              <th className="p-2 text-left">Minutes Played</th>
              <th className="p-2 text-left">Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.game} className="border-t hover:bg-gray-50">
                <td className="p-2">{s.game}</td>
                <td className="p-2">{s.minutes}</td>
                <td className="p-2">{s.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
