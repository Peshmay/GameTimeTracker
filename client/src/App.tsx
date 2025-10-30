import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import WeatherWidget from "./components/WeatherWidget";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import PlayPage from "./pages/PlayPage";
import StatisticsPage from "./pages/StatisticsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import TimerPage from "./pages/TimerPage";


export default function App() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="border-b">
          <div className="max-w-6xl mx-auto">
            <WeatherWidget />
          </div>
        </div>
        <div className="max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/play/timer" element={<TimerPage />} />
            <Route path="/stats" element={<StatisticsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

