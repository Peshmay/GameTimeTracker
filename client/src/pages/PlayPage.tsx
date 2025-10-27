import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | undefined>();
  const [gameId, setGameId] = useState<number | undefined>();
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    (async () => {
      setUsers((await axios.get("http://localhost:4000/api/users")).data);
      setGames((await axios.get("http://localhost:4000/api/games")).data);
    })();
  }, []);

  useEffect(() => {
    let t: any;
    if (playing) t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [playing]);

  async function start() {
    const res = await axios.post("http://localhost:4000/api/sessions/start", { userId, gameId });
    setSessionId(res.data.id);
    setElapsed(0);
    setPlaying(true);
  }

  async function stop() {
    await axios.patch("http://localhost:4000/api/sessions/stop", { id: sessionId });
    setPlaying(false);
    setSessionId(null);
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Play Game</h2>

      <div className="flex gap-4">
        <select className="border p-2 rounded" value={userId} onChange={e => setUserId(Number(e.target.value))}>
          <option value="">Select User</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
        </select>

        <select className="border p-2 rounded" value={gameId} onChange={e => setGameId(Number(e.target.value))}>
          <option value="">Select Game</option>
          {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-3">
        {!playing ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-40"
            onClick={start}
            disabled={!userId || !gameId}
          >
            ▶️ Start
          </button>
        ) : (
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={stop}>⏹ Stop</button>
        )}
        {playing && <span className="text-gray-700">Playing… {elapsed}s</span>}
      </div>
    </div>
  );
}
