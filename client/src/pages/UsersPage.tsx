import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:4000/api/users");
      setUsers(res.data);
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <div className="flex flex-wrap gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => navigate(`/users/${u.id}`)}
            className="w-48 bg-gray-100 p-3 rounded shadow text-center cursor-pointer hover:scale-105 hover:bg-blue-50 transition transform"
          >
            <img
              src={`http://localhost:4000${u.profilePic || "/uploads/default.png"}`}
              alt={u.firstName}
              className="w-24 h-24 object-cover mx-auto rounded-full"
            />
            <p className="font-semibold mt-2">{u.firstName} {u.lastName}</p>
            <p className="text-xs text-gray-600">{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
