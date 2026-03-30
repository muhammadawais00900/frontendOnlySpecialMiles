
const MetricCard = ({ label, value, hint }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-3 text-3xl font-bold text-brand-navy">{value}</p>
    {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
  </div>
);

export default MetricCard;
