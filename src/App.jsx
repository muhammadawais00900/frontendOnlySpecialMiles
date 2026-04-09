import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PublicLayout from "./components/PublicLayout";
import AppShell from "./components/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import AwardsPage from "./pages/public/AwardsPage";
import PublicProgramsPage from "./pages/public/PublicProgramsPage";
import FaqPage from "./pages/public/FaqPage";
import ContactPage from "./pages/public/ContactPage";
import ResourcesBlogsPage from "./pages/public/ResourcesBlogsPage";
import PoliciesPage from "./pages/public/PoliciesPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ResetPasswordPage from "./pages/public/ResetPasswordPage";
import DashboardPage from "./pages/portal/DashboardPage";
import ProgramsPage from "./pages/portal/ProgramsPage";
import ProgramDetailPage from "./pages/portal/ProgramDetailPage";
import ResourcesPage from "./pages/portal/ResourcesPage";
import ResourceDetailPage from "./pages/portal/ResourceDetailPage";
import BookingsPage from "./pages/portal/BookingsPage";
import MessagesPage from "./pages/portal/MessagesPage";
import NotificationsPage from "./pages/portal/NotificationsPage";
import SupportPage from "./pages/portal/SupportPage";
import ProfilePage from "./pages/portal/ProfilePage";
import SettingsPage from "./pages/portal/SettingsPage";
import AdminPage from "./pages/portal/AdminPage";
import NotFoundPage from "./pages/portal/NotFoundPage";

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<PublicProgramsPage />} />
        <Route path="/resources" element={<ResourcesBlogsPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/privacy" element={<PoliciesPage />} />
        <Route path="/terms" element={<PoliciesPage />} />
        <Route path="/refund" element={<PoliciesPage />} />
      </Route>

      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="programs/:id" element={<ProgramDetailPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="resources/:id" element={<ResourceDetailPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute allow={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
