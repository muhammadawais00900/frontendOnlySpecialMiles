import { useMemo, useState } from "react";
import Logo from "./Logo";

const CertificateCreator = () => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    recipient: "",
    program: "Special Miles Program",
    date: today,
    issuer: "Special Miles",
  });

  const formattedDate = useMemo(() => {
    if (!form.date) return "";
    return new Date(form.date).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, [form.date]);

  const updateField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handlePrint = () => {
    const certificate = document.getElementById(
      "special-miles-certificate-preview",
    );
    if (!certificate) return;

    const printWindow = window.open("", "_blank", "width=1100,height=800");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Special Miles Certificate</title>
          <style>
            body { margin: 0; padding: 24px; font-family: Arial, sans-serif; background: #f8fafc; }
            .print-wrap { max-width: 1100px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="print-wrap">${certificate.outerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
            Certificate creation
          </p>
          <h2 className="mt-3 text-2xl font-bold text-brand-navy">
            Generate a Special Miles certificate
          </h2>
          <p className="mt-3 text-slate-600">
            Add the participant name, program title and completion date, then
            print or save the certificate as PDF.
          </p>

          <div className="mt-6 grid gap-4">
            <label className="text-sm font-medium text-slate-700">
              Participant name
              <input
                value={form.recipient}
                onChange={(event) =>
                  updateField("recipient", event.target.value)
                }
                placeholder="Enter participant name"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-300"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Program / course
              <input
                value={form.program}
                onChange={(event) => updateField("program", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-300"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Completion date
              <input
                type="date"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-300"
              />
            </label>

            <label className="text-sm font-medium text-slate-700">
              Issued by
              <input
                value={form.issuer}
                onChange={(event) => updateField("issuer", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-300"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="mt-6 rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Download / Print certificate
          </button>
        </div>

        <div
          id="special-miles-certificate-preview"
          className="rounded-[32px] border-[10px] border-brand-100 bg-white p-8 shadow-soft sm:p-12"
        >
          <div className="flex items-start justify-between gap-4">
            <Logo />
            <p className="text-right text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">
              Certificate of completion
            </p>
          </div>

          <div className="mt-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              This certificate is proudly presented to
            </p>
            <h3 className="mt-6 text-3xl font-bold text-brand-navy sm:text-5xl">
              {form.recipient || "Participant Name"}
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              for successfully completing
            </p>
            <p className="mt-4 text-2xl font-semibold text-brand-700 sm:text-3xl">
              {form.program || "Special Miles Program"}
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Date
              </p>
              <p className="mt-3 text-lg font-semibold text-brand-navy">
                {formattedDate || "Date"}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Issued by
              </p>
              <p className="mt-3 text-lg font-semibold text-brand-navy">
                {form.issuer || "Special Miles"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateCreator;
