import { useEffect, useState } from "react";
import axios from "axios";
import genres from "../assets/genres";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { getAvatarForUser } from "../utils/avatars"; // returns "/avatars/...png"

export default function PlayPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]); // backend games used for timing
  const [userId, setUserId] = useState<number | undefined>();
  const [gameId, setGameId] = useState<number | undefined>();

  // keep these states as-is (not used once we navigate to TimerPage)
  const [sessionId] = useState<number | null>(null);
  const [playing] = useState(false);
  const [elapsed] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setUsers((await axios.get("http://localhost:4000/api/users")).data);
      setGames((await axios.get("http://localhost:4000/api/games")).data);
    })();
  }, []);

  // 👉 NEW: Start now just navigates to /play/timer with selected user+game
  function start() {
    if (!userId || !gameId) {
      alert("Select user and game first.");
      return;
    }
    const user = users.find((u) => u.id === userId);
    const game = games.find((g) => g.id === gameId);
    if (!user || !game) return;

    // resolve avatar (uploaded file from backend or cute local avatar)
    const avatar = user.profilePic?.startsWith("/uploads")
      ? `http://localhost:4000${user.profilePic}`
      : user.profilePic || getAvatarForUser(user.id);

    navigate("/play/timer", { state: { user, game, avatar } });
  }

  async function stop() {
    // no-op now (TimerPage owns stop). Kept to avoid changing your JSX structure.
    // If you keep a Stop button here, it won't be shown because "playing" is false.
    return;
  }

  // OPTIONAL: clicking a showcase card can pre-select the backend game by name match.
  function handleShowcaseClick(name: string) {
    const found = games.find((g: any) => g.name.toLowerCase() === name.toLowerCase());
    if (found) setGameId(found.id);
  }

  // Compute “(N)” in the title
  const totalShowcase = genres.length; // one card per genre (first game)

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Play Game</h2>

      {/* Top controls (same line) */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="border p-2 rounded min-w-[180px]"
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
          className="border p-2 rounded min-w-[180px]"
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

        {/* Always shows Start (TimerPage handles the actual session) */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-40 flex items-center gap-2"
          onClick={start}
          disabled={!userId || !gameId}
        >
          <span>▶</span> Start
        </button>

        {/* kept for layout compatibility; won't render since playing=false */}
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
