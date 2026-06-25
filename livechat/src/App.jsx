import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Pages/Sidebar";
import Dashboard from "./Components/Pages/Dashboard";
import Chat from "./Components/Pages/Chat";
import Departments from "./Components/Pages/Departments";
import AnalyticsPage from "./Components/Pages/AnalyticsPage";
import LoginPage from "./Components/Authorization/Login";
import TeamMembers from "./Components/Pages/TeamMembers";
import SettingsPage from "./Components/Pages/SettingsPage";
import NotFoundPage from "./Components/Pages/Pagenotfound";
import SignupPage from "./Components/Authorization/SignupPage";
import { PriceChange } from "@mui/icons-material";
import PrivateRoute from "./Components/Authorization/PrivateRoute";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
        
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Sidebar><Dashboard /></Sidebar>} />
        <Route path="/" element={<Sidebar><Dashboard /></Sidebar>} />
        <Route path="/chat" element={<Sidebar><Chat /></Sidebar>} />
        <Route path="/departments" element={<Sidebar><Departments /></Sidebar>} />
        <Route path="/analytics" element={<Sidebar><AnalyticsPage /></Sidebar>} />
        <Route path="/team-members" element={<Sidebar><TeamMembers /></Sidebar>} />
        <Route path="/settings" element={<Sidebar><SettingsPage /></Sidebar>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
