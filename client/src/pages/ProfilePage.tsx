import { useState } from "react";
import axios from "axios";
import { getRandomAvatar } from "../utils/avatars";

const avatar = getRandomAvatar();

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<any>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      if (file) {
        data.append("profilePic", file);
      } else {
        data.append("avatarUrl", getRandomAvatar());
      }

      const res = await axios.post("http://localhost:4000/api/users", data);
      setCreated(res.data);
      setEmail("");
      setFirst("");
      setLast("");
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setError("Error registering user.");
    }
  };

  return (
    // Page background: plain light (no purple)
    <div className="flex justify-center items-center min-h-screen bg-white">
      {/* Dark card like your screenshot */}
      <div className="w-[360px] h-[520px] rounded-xl shadow-2xl bg-[#252525] text-white p-6">
        <h2 className="text-[24px] font-bold text-center mb-4 opacity-90">Register</h2>

        <form onSubmit={submit} className="grid gap-3">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Email address *
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-[#3a3a3a] bg-[#1e1e1e] text-gray-100 placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                First Name *
              </label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirst(e.target.value)}
                placeholder="Jane"
                className="w-full rounded-md border border-[#3a3a3a] bg-[#1e1e1e] text-gray-100 placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                required
                value={lastName}
                onChange={(e) => setLast(e.target.value)}
                placeholder="Doe"
                className="w-full rounded-md border border-[#3a3a3a] bg-[#1e1e1e] text-gray-100 placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Profile picture */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-200 file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-[#2c2c2c] file:text-gray-200 file:hover:bg-[#333]"
            />
          </div>

          {/* Register button – gradient like your photo */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-md py-2 font-semibold text-white shadow-md
                         bg-gradient-to-r from-[#6a5acd] to-[#ff6aa0]
                         hover:from-[#5a4ad1] hover:to-[#ff5e98] transition"
            >
              REGISTER
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </form>

        {/* Created user preview (dark) */}
        {created && (
          <div className="mt-5">
            <div className="flex items-center gap-3 bg-[#1e1e1e] border border-[#333] p-3 rounded-lg">
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-[#333]"
                src={
                  created.profilePic
                    ? `http://localhost:4000${created.profilePic}`
                    : "http://localhost:4000/uploads/default.png"
                }
                alt="Profile"
              />
              <div>
                <div className="font-medium">
                  {created.firstName} {created.lastName}
                </div>
                <div className="text-xs text-gray-300">{created.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
