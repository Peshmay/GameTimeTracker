import { useState } from "react";
import axios from "axios";

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
      if (file) data.append("profilePic", file);

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
   <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">
  <div
    className="bg-white shadow-xl rounded-2xl p-8 border border-blue-100"
    style={{ width: "360px", height: "520px" }}
  >
    <h2 className="text-[32px] font-bold text-center text-blue-700 mb-6">
      Welcome
    </h2>


        <form onSubmit={submit} className="grid gap-3 px-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email address *
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-2"
            />
          </div>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                First Name *
              </label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirst(e.target.value)}
                placeholder="Jane"
                className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                required
                value={lastName}
                onChange={(e) => setLast(e.target.value)}
                placeholder="Doe"
                className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-2"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 shadow-md"
            >
              REGISTER
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}
        </form>

        {/* Created user preview */}
        {created && (
          <div className="grid gap-3 px-4 pt-6">
            <div className="flex items-center gap-3 bg-blue-100 text-gray-800 p-3 rounded-lg border border-blue-200 shadow-inner">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                src={
                  created.profilePic
                    ? `http://localhost:4000${created.profilePic}`
                    : "http://localhost:4000/uploads/default.png"
                }
                alt="Profile"
              />
              <div>
                <div className="font-medium text-lg">
                  {created.firstName} {created.lastName}
                </div>
                <div className="text-sm opacity-80">{created.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
