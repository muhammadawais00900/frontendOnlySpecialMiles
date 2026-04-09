import { useEffect, useMemo, useState } from "react";
import client from "../../api/client";
import {
  formatDate,
  formatDateTime,
  toSentenceCase,
} from "../../utils/helpers";
import { useMeta } from "../../hooks/useMeta";
import { usePreferences } from "../../context/PreferencesContext";
import Alert from "../../components/Alert";
import LoadingSpinner from "../../components/LoadingSpinner";
import MetricCard from "../../components/MetricCard";
import TableCard from "../../components/TableCard";
import SectionHeader from "../../components/SectionHeader";
import CertificateCreator from "../../components/CertificateCreator";
const AdminPage = () => {
  const { t } = usePreferences();
  const [overview, setOverview] = useState(null);
  const [siteContent, setSiteContent] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [faqsText, setFaqsText] = useState("[]");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: t("nav.admin"),
    description:
      "Admin workspace for users, bookings, support tickets, analytics and CMS-style site content.",
  });

  const load = async () => {
    try {
      setLoading(true);
      const [{ data: overviewData }, { data: siteData }] = await Promise.all([
        client.get("/dashboard/admin"),
        client.get("/site/public"),
      ]);
      setOverview(overviewData);
      setSiteContent(siteData);
      setAnnouncement(siteData.announcement || "");
      setFaqsText(JSON.stringify(siteData.faqs || [], null, 2));
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const metrics = useMemo(
    () =>
      overview
        ? [
            ["Users", overview.counts.totalUsers],
            ["Programs", overview.counts.totalPrograms],
            ["Resources", overview.counts.totalResources],
            ["Bookings", overview.counts.totalBookings],
            ["Tickets", overview.counts.totalTickets],
            ["Open tickets", overview.counts.openTickets],
          ]
        : [],
    [overview],
  );

  const updateUser = async (id, patch) => {
    try {
      await client.patch(`/users/admin/${id}`, patch);
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  const updateTicket = async (id, patch) => {
    try {
      await client.patch(`/tickets/admin/${id}`, patch);
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  const updateBooking = async (id, patch) => {
    try {
      await client.patch(`/bookings/admin/${id}`, patch);
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  const saveSiteContent = async (event) => {
    event.preventDefault();
    try {
      const parsedFaqs = JSON.parse(faqsText);
      await client.put("/site/admin", {
        ...siteContent,
        announcement,
        faqs: parsedFaqs,
      });
      setFeedback({ type: "success", message: "Public site content updated." });
      await load();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <SectionHeader
        title={t("admin.title")}
        description={t("admin.subtitle")}
      />
      {feedback ? (
        <Alert variant={feedback.type}>{feedback.message}</Alert>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value]) => (
          <MetricCard key={label} label={label} value={value} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <TableCard
          title={t("admin.users")}
          columns={[
            { key: "name", label: "Name" },
            {
              key: "role",
              label: "Role",
              render: (row) => (
                <select
                  value={row.role}
                  onChange={(e) =>
                    updateUser(row._id, { role: e.target.value })
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  {["parent", "educator", "student", "organisation"].map(
                    (role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ),
                  )}
                </select>
              ),
            },
            {
              key: "isActive",
              label: "Active",
              render: (row) => (
                <input
                  type="checkbox"
                  checked={row.isActive}
                  onChange={(e) =>
                    updateUser(row._id, { isActive: e.target.checked })
                  }
                />
              ),
            },
            {
              key: "lastLoginAt",
              label: "Last login",
              render: (row) => formatDate(row.lastLoginAt),
            },
          ]}
          rows={overview.users}
        />

        <TableCard
          title={t("admin.bookings")}
          columns={[
            { key: "referenceCode", label: "Reference" },
            { key: "sessionType", label: "Session" },
            {
              key: "bookingStatus",
              label: "Status",
              render: (row) => (
                <select
                  value={row.bookingStatus}
                  onChange={(e) =>
                    updateBooking(row._id, { bookingStatus: e.target.value })
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  {["pending", "confirmed", "cancelled", "completed"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ),
                  )}
                </select>
              ),
            },
            {
              key: "createdAt",
              label: "Created",
              render: (row) => formatDateTime(row.createdAt),
            },
          ]}
          rows={overview.bookings}
        />
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-brand-navy">
          Certificate creation
        </h2>
        <p className="mt-2 text-slate-600">
          This section is restricted to admin users only.
        </p>

        <div className="mt-4">
          <CertificateCreator />
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <TableCard
          title={t("admin.tickets")}
          columns={[
            { key: "subject", label: "Subject" },
            { key: "category", label: "Category" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <select
                  value={row.status}
                  onChange={(e) =>
                    updateTicket(row._id, { status: e.target.value })
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                >
                  {["open", "in-progress", "resolved", "closed"].map(
                    (status) => (
                      <option key={status} value={status}>
                        {toSentenceCase(status)}
                      </option>
                    ),
                  )}
                </select>
              ),
            },
            { key: "priority", label: "Priority" },
          ]}
          rows={overview.tickets}
        />

        <form
          onSubmit={saveSiteContent}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
        >
          <h2 className="text-xl font-semibold text-brand-navy">
            {t("admin.contentEditor")}
          </h2>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Announcement banner
            </span>
            <input
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="input"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              FAQs JSON
            </span>
            <textarea
              value={faqsText}
              onChange={(e) => setFaqsText(e.target.value)}
              rows={16}
              className="input font-mono text-xs min-h-[360px]"
            />
          </label>
          <button
            type="submit"
            className="mt-6 rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white"
          >
            Save site content
          </button>
        </form>
      </section>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-brand-navy">
          Activity monitoring
        </h2>
        <div className="mt-4 space-y-3">
          {overview.activities.map((activity) => (
            <div
              key={activity._id}
              className="rounded-2xl bg-slate-50 px-4 py-3"
            >
              <p className="font-medium text-brand-navy">
                {activity.description}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {formatDateTime(activity.createdAt)} ·{" "}
                {activity.actorRole || "system"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
