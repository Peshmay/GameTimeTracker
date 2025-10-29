import { useEffect, useState } from "react";
import axios from "axios";
import genres from "../assets/genres";
import GameCard from "../components/GameCard";

export default function PlayPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]); // backend games used for timing
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
    if (playing) t = setInterval(() => setElapsed((e) => e + 1), 1000);
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

  // OPTIONAL: clicking a showcase card can pre-select the backend game by name match.
  function handleShowcaseClick(name: string) {
    const found = games.find((g: any) => g.name.toLowerCase() === name.toLowerCase());
    if (found) setGameId(found.id);
  }

  // Compute “(N)” in the title
  const totalShowcase = genres.length; // one card per genre (first game)
  // If you want 2x2 like your image, we’ll render exactly 4 cards below.

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Play Game</h2>

      {/* Top controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="border p-2 rounded"
          value={userId ?? ""}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={gameId ?? ""}
          onChange={(e) => setGameId(Number(e.target.value))}
        >
          <option value="">Select Game</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        {!playing ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-40 flex items-center gap-2"
            onClick={start}
            disabled={!userId || !gameId}
          >
            <span>▶</span> Start
          </button>
        ) : (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={stop}
          >
            ⏹ Stop
          </button>
        )}
        {playing && <span className="text-gray-600">Playing… {elapsed}s</span>}
      </div>

      {/* Showcase grid */}
      <section className="mt-4">
        <h3 className="text-3xl font-black uppercase tracking-wide">
          Games <span className="text-orange-500 align-top text-2xl">({totalShowcase})</span>
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {genres.slice(0, 4).map((genre) => {
            const game = genre.games[0]; // pick first game for the card
            return (
              <GameCard
                key={genre.id}
                genre={genre}
                game={game}
                onClick={() => handleShowcaseClick(game.name)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
